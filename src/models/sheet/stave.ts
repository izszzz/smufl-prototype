import * as Sheet from "sheet";
import { Type } from "../files/musicxml/schema";

export class Stave {
  id;
  clef;
  barlines;
  bar!: Sheet.Bar;
  constructor({
    id,
    clef,
    barline,
  }: {
    id: number;
    clef: Type.Clef;
    barline: Type.Barline;
  }) {
    this.id = id;
    this.clef = clef;
    this.barlines = barline;
  }
}
