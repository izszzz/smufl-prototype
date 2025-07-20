import * as R from "remeda";
import * as Sheet from "sheet";

export class Masterbar {
  id;
  rowId;
  score!: Sheet.Score;
  get x(): number {
    const prev = this.row.masterbars[this.row.masterbars.indexOf(this) - 1];
    return prev ? prev.x + prev.width : 0;
  }
  get prev() {
    return this.score.masterbars[this.id - 1];
  }
  get row() {
    return this.score.rows.find((row) => row.id === this.rowId)!;
  }
  get bars() {
    return this.score.bars.filter((bar) => bar.masterbarId === this.id);
  }
  get width() {
    return R.firstBy(this.bars, [(bar) => bar.width, "desc"])?.width ?? 0;
  }
  get height() {
    // TODO: 複数barの場合、bar間のスペースを考慮する
    return this.bars.reduce((acc, cur) => acc + cur.height, 0);
  }
  get isRowFirst() {
    return this.row.masterbars[0] === this;
  }
  get isFirst() {
    return this.score.masterbars[0] === this;
  }
  constructor({ id, rowId }: { id: number; rowId?: number }) {
    this.id = id;
    this.rowId = rowId;
  }
}
