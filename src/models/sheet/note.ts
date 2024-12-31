import * as Core from "core";
import * as Sheet from "sheet";
export class Note extends Core.Note {
  track!: Sheet.Track;
  bar!: Sheet.Bar;
  rest;
  chord;
  constructor({
    rest,
    chord,
    ...note
  }: {
    rest: boolean;
    chord: boolean;
  } & Core.Note) {
    super(note);
    this.rest = rest;
    this.chord = chord;
  }
}
