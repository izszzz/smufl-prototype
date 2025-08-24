import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";

export class Masterbar extends Core.Event {
  readonly id;
  rowId;
  score!: Sheet.Score;
  get x(): number {
    const prev = this.row.masterbars[this.row.masterbars.indexOf(this) - 1];
    return prev ? prev.x + prev.width : 0;
  }
  get width() {
    return (
      R.pipe(
        R.firstBy(this.bars, [R.prop("width"), "desc"]),
        R.prop("width")
      ) ?? 0
    );
  }
  get height() {
    return this.bars.reduce((acc, cur) => acc + cur.height, 0);
  }
  get isRowFirst() {
    return this.row.masterbars[0]?.id === this.id;
  }
  get isFirst() {
    return this.score.masterbars[0]?.id === this.id;
  }
  get isLast() {
    return this.score.masterbars.at(-1)?.id === this.id;
  }
  get prev() {
    return this.score.masterbars[this.id - 1];
  }
  get row() {
    return this.score.rows.find((row) => row.id === this.rowId)!;
  }
  get bars() {
    return this.score.bars.filter((bar) => bar.id === this.id);
  }
  get notes() {
    return this.score.notes.filter((note) => note.isOverlapped(this));
  }
  constructor({
    id,
    rowId,
    ...event
  }: { id: number; rowId?: number } & ConstructorParameters<
    typeof Core.Event
  >[0]) {
    super(event);
    this.id = id;
    this.rowId = rowId;
  }
}
