import * as R from "remeda";
import { LayoutType, Score } from "./";
import { Row } from "./row";

export class Controller {
  constructor(
    public score: Score,
    public layoutType: LayoutType
  ) {}

  layout(layoutType: LayoutType, clientWidth: number) {
    this.layoutType = layoutType;
    switch (this.layoutType) {
      case LayoutType.Horizontal:
        this.score.rows = [new Row(this.score.masterbars)];
        break;
      case LayoutType.Vertical:
        this.score.rows = splitByWidth(
          this.score.masterbars,
          clientWidth / 10, // svg側でscale 10しているので調整
          (mb) => mb.width
        ).map((masterbars) => new Row(masterbars));
        break;
    }
    for (const row of this.score.rows) {
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
