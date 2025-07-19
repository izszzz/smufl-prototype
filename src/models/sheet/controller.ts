import * as R from "remeda";
import { LayoutType, Score } from "./";
import { Row } from "./row";

export class Controller {
  constructor(
    public score: Score,
    public layoutType: LayoutType,
    public scale: number = 30
  ) {}

  layout(layoutType: LayoutType) {
    this.layoutType = layoutType;
    switch (layoutType) {
      case LayoutType.Horizontal:
        this.score.rows = [
          new Row({
            id: 0,
            masterbars: this.score.masterbars,
          }),
        ];
        break;
      case LayoutType.Vertical:
        this.score.rows = splitByWidth(
          this.score.masterbars,
          this.scale,
          (mb) => mb.width
        ).map((masterbars, id) => new Row({ id, masterbars }));
        break;
    }
    for (const row of this.score.rows) {
      row.score = this.score;
      for (const masterbar of row.masterbars) {
        masterbar.row = row;
      }
    }
  }
}

function splitByWidth<T>(
  items: T[],
  width: number,
  weightSelector: (item: T) => number
): T[][] {
  return R.pipe(
    items,
    R.reduce(
      (acc, item) => {
        const current = acc[acc.length - 1];
        const currentSum =
          current?.reduce((sum, el) => sum + weightSelector(el), 0) ?? 0;
        const itemWeight = weightSelector(item);
        console.log();
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
