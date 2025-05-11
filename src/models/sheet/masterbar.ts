import * as Sheet from "sheet";

export class Masterbar<
  Note extends Sheet.Note = Sheet.Note,
  Stave extends Sheet.Stave = Sheet.Stave,
  Bar extends Sheet.Bar<Note, Stave> = Sheet.Bar<Note, Stave>,
> {
  id;
  width;
  bars;
  constructor({ id, width, bars }: { id: number; width: number; bars: Bar[] }) {
    this.width = width;
    this.id = id;
    this.bars = bars;
  }
}
