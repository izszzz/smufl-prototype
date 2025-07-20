import * as Sheet from "sheet";
import * as R from "remeda";

const paddingBottom = 4;
export class Row {
  id;
  score!: Sheet.Score;
  get masterbars() {
    return this.score.masterbars.filter(
      (masterbar) => masterbar.rowId === this.id
    );
  }
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

  constructor({ id }: { id: number }) {
    this.id = id;
  }
}
