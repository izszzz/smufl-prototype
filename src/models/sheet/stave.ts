import * as Sheet from "sheet";
import { Barline, Clef } from "src/const/musicxml/4.0/musicxml";

export class Stave {
  id;
  clef;
  barlines;
  notes;
  bar!: Sheet.Bar;
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
    this.clef = clef;
    this.barlines = barline;
    this.notes = notes;
  }
}
