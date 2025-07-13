import * as R from "remeda";
import * as Sheet from "sheet";

export class Masterbar<
  Note extends Sheet.Note = Sheet.Note,
  Stave extends Sheet.Stave = Sheet.Stave,
  Bar extends Sheet.Bar<Note, Stave> = Sheet.Bar<Note, Stave>,
> {
  id;
  row: Sheet.Row | null = null;
  bars;
  x = 0;
  get width() {
    return R.firstBy(this.bars, [(bar) => bar.width, "desc"])?.width ?? 0;
  }
  get height() {
    // TODO: 複数barの場合、bar間のスペースを考慮する
    return this.bars.reduce((acc, cur) => acc + cur.height, 0);
  }

  get isFirst() {
    return this.row?.masterbars[0] === this;
  }
  constructor({ id, bars }: { id: number; bars: Bar[] }) {
    this.id = id;
    this.bars = bars;
  }
}
