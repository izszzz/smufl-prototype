import * as Sheet from "sheet";
import * as R from "remeda";

const paddingBottom = 4;
export class Row<Masterbar extends Sheet.Masterbar = Sheet.Masterbar> {
  id;
  masterbars;
  score!: Sheet.Score;
  get width() {
    return this.masterbars.reduce((acc, cur) => acc + cur.width, 0);
  }
  get height() {
    return (
      (R.firstBy(this.masterbars, [(mb) => mb.height, "desc"])?.height ?? 0) +
      paddingBottom
    );
  }
  get y(): number {
    return this.prev ? this.prev.y + this.height : 0;
  }
  get prev() {
    return this.score.rows[this.id - 1];
  }

  constructor({ id, masterbars }: { id: number; masterbars: Masterbar[] }) {
    this.id = id;
    this.masterbars = masterbars;
  }

  order() {
    this.masterbars.reduce((acc, cur) => {
      cur.x = acc;
      return acc + cur.width;
    }, 0);
  }
}
