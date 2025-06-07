import * as R from "remeda";
import * as Sheet from "sheet";

export class Masterbar<
  Note extends Sheet.Note = Sheet.Note,
  Stave extends Sheet.Stave = Sheet.Stave,
  Bar extends Sheet.Bar<Note, Stave> = Sheet.Bar<Note, Stave>,
> {
  id;
  get width() {
    return R.firstBy(this.bars, [(bar) => bar.width, "desc"])?.width ?? 0;
  }
  bars;
  x = 0;
  constructor({ id, bars }: { id: number; bars: Bar[] }) {
    this.id = id;
    this.bars = bars;
  }
}
