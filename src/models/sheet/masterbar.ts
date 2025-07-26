import * as R from "remeda";
import * as Sheet from "sheet";

export class Masterbar {
  readonly id;
  rowId;
  score!: Sheet.Score;
  get x(): number {
    const prev = this.row.masterbars[this.row.masterbars.indexOf(this) - 1];
    return prev ? prev.x + prev.width : 0;
  }
  get width() {
    return R.firstBy(this.bars, [(bar) => bar.width, "desc"])?.width ?? 0;
  }
  get height() {
    // trackも考慮
    // TODO: 複数barの場合、bar間のスペースを考慮する
    return this.bars.reduce((acc, cur) => acc + cur.height, 0);
  }
  get isRowFirst() {
    return this.row.masterbars[0] === this;
  }
  get isFirst() {
    return this.score.masterbars[0] === this;
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
  get tracks() {
    return this.score.tracks;
  }
  constructor({ id, rowId }: { id: number; rowId?: number }) {
    this.id = id;
    this.rowId = rowId;
  }
}
