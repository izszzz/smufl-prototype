import * as Sheet from "sheet";
import * as R from "remeda";

const paddingBottom = 4;
export class Row {
  readonly id;
  score!: Sheet.Score;
  get width() {
    return this.masterbars.reduce((acc, cur) => acc + cur.width, 0);
  }
  get minWidth() {
    return this.masterbars.reduce((acc, cur) => acc + cur.minWidth, 0);
  }
  get height() {
    return (
      (R.pipe(
        R.firstBy(this.masterbars, [R.prop("height"), "desc"]),
        R.prop("height")
      ) ?? 0) + paddingBottom
    );
  }
  get y(): number {
    return this.prev ? this.prev.y + this.height : 0;
  }
  get masterbars() {
    return this.score.masterbars.filter(
      (masterbar) => masterbar.rowId === this.id
    );
  }
  get prev() {
    return this.score.rows[this.id - 1];
  }

  constructor({ id }: { id: number }) {
    this.id = id;
  }
}
