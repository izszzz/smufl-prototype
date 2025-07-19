import * as Sheet from "sheet";
import { Barline, Clef } from "src/const/musicxml/4.0/musicxml";

export class Stave {
  id;
  barlines;
  notes;
  bar!: Sheet.Bar;
  _clef;
  get width() {
    return 0;
  }
  get height() {
    return 0;
  }
  get y() {
    return (this.height + 6.5) * this.id;
  }
  get prev() {
    return this.bar.prev?.staves[this.id];
  }
  get clef(): Clef {
    return this._clef ? this._clef : this.prev!.clef;
  }

  constructor({
    id,
    clef,
    barline,
    notes,
  }: {
    id: number;
    clef?: Clef;
    barline?: Barline;
    notes: Sheet.Note[];
  }) {
    this.id = id;
    this._clef = clef;
    this.barlines = barline;
    this.notes = notes;
  }
}
