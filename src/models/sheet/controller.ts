import { match } from "ts-pattern";
import { LayoutType, Score } from "./";
import { Row } from "./row";
import {
  defaultTo,
  entries,
  firstBy,
  flatMap,
  forEach,
  groupBy,
  pipe,
  piped,
  prop,
  reduce,
} from "remeda";

export class Controller {
  constructor(
    public score: Score,
    public layoutType: LayoutType,
    public scale: number = 30
  ) {
    this.layoutType = layoutType;
    this.layout(layoutType);
  }
  layout(layoutType: LayoutType) {
    switch (layoutType) {
      case LayoutType.Horizontal:
        for (const masterbar of this.score.masterbars) masterbar.rowId = 0;
        this.score.rows = [new Row({ id: 0 })];
        break;
      case LayoutType.Vertical:
        this.score.rows = splitByWidth(
          this.score.masterbars,
          this.scale,
          (mb) => mb.width
        ).map((masterbars, id) => {
          for (const masterbar of masterbars) masterbar.rowId = id;
          return new Row({ id });
        });
        break;
    }
    for (const row of this.score.rows) row.score = this.score;
    this.draw();
    this.space();
    this.order();
    console.log(this.score);
  }
  draw() {
    for (const data of [
      ...this.score.notes,
      ...this.score.staves,
      ...this.score.timesignatures,
    ])
      data.draw();
  }
  order() {
    this.score.staves.flatMap((stave) => stave.ligature?.order());
  }
  space() {
    for (const row of this.score.rows) {
      const groupedByStartNotes = pipe(
        row,
        prop("masterbars"),
        flatMap(prop("notes")),
        groupBy(prop("start", "value")),
        entries()
      );
      match(this.layoutType)
        .with(LayoutType.Page as 0, () => {})
        .with(LayoutType.Horizontal as 2, () => {
          for (const [, notes] of groupedByStartNotes)
            for (const note of notes)
              if (note.ligature) note.ligature.inset.right = 2; // FIXME: const
        })
        .with(LayoutType.Vertical as 1, () => {
          // const space = clientWidth / pipe(groupedByStartNotes, length());
          // for (const [, notes] of groupedByStartNotes)
          //   for (const note of notes)
          //     if (note.ligature) note.ligature.width += space;
        })
        .exhaustive();
    }
  }
  /* align() {
    pipe(
      this.score.notes,
      groupBy(prop("start", "value")),
      entries(),
      forEach(([, notes]) => {
        const maxXNote = firstBy(notes, [
          piped(prop("ligature", "x"), defaultTo(0)),
          "desc",
        ]);
        for (const note of notes) {
          if (note.id === maxXNote.id) continue;
          if (note.ligature) note.ligature.x = maxXNote.ligature?.x ?? 0;
        }
      })
    );
  } */
}

function splitByWidth<T>(
  items: T[],
  width: number,
  weightSelector: (item: T) => number
): T[][] {
  return pipe(
    items,
    reduce(
      (acc, item) => {
        const current = acc[acc.length - 1];
        const currentSum =
          current?.reduce((sum, el) => sum + weightSelector(el), 0) ?? 0;
        const itemWeight = weightSelector(item);
        if (currentSum + itemWeight > width) {
          acc.push([item]);
        } else {
          current?.push(item);
        }
        return acc;
      },
      [[]] as T[][]
    )
  );
}
