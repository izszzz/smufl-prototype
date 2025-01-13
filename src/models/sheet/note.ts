import * as Core from "core";
import * as Sheet from "sheet";
import { Type } from "../files/mxl/schema";

export class Note extends Core.Note {
  track!: Sheet.Track;
  bar!: Sheet.Bar;
  chord;
  stem;
  type;
  rest;
  flag: null = null;
  x;
  y;
  get legerLine() {
    return this.pitch.value > 80 || this.pitch.value <= 60
      ? Math.ceil((this.pitch.value - 59) / 2)
      : 0;
  }
  constructor({
    rest,
    chord,
    type,
    stem,
    x,
    y,
    ...note
  }: {
    type: Type.NoteTypeValue | null;
    stem: Type.StemValue | null;
    rest: boolean | "measure";
    chord: boolean;
    x: number;
    y: number;
  } & Core.Note) {
    super(note);
    this.chord = chord;
    this.stem = stem;
    this.type = type;
    this.rest = rest;
    this.x = x;
    this.y = y;
  }
}
