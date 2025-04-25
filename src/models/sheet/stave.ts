import * as Sheet from "sheet";
import { Type } from "../files/musicxml/schema";

export class Stave {
  id;
  clef;
  barlines;
  notes;
  bar!: Sheet.Bar;
  constructor({
    id,
    clef,
    barlines: barline,
    notes,
  }: {
    id: number;
    clef: Type.Clef;
    barlines: Type.Barline;
    notes: Sheet.Note[];
  }) {
    this.id = id;
    this.clef = clef;
    this.barlines = barline;
    this.notes = notes;
  }
}
