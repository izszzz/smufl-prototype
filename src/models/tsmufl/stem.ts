import * as SMUFL from ".";
import * as Core from "../core";
export class Stem {
  note;
  get glyph() {
    return new SMUFL.Glyph("stem");
  }
  get type() {
    return this.note.pitch - SMUFL.Metadata.midiMiddleC >=
      Core.Metadata.pitchClasses.length
      ? "Down"
      : "Up";
  }
  constructor({ note }: { note: SMUFL.Note }) {
    this.note = note;
  }
}
