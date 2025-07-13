import * as Sheet from "sheet";

export class Row<Masterbar extends Sheet.Masterbar = Sheet.Masterbar> {
  get width() {
    return this.masterbars.reduce((acc, cur) => acc + cur.width, 0);
  }
  get y() {
    return 0;
  }

  constructor(public masterbars: Masterbar[]) {}

  order() {
    this.masterbars.reduce((acc, cur) => {
      cur.x = acc;
      return acc + cur.width;
    }, 0);
  }
}
