import * as SMUFL from ".";
export class Notehead {
  note;
  get glyph() {
    return new SMUFL.Glyph(
      (() => {
        if (this.note.fraction === 1) return "noteheadWhole";
        if (this.note.fraction === 2) return "noteheadHalf";
        return "noteheadBlack";
      })()
    );
  }
  constructor({ note }: { note: SMUFL.Note }) {
    this.note = note;
  }
}
