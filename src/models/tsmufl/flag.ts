import * as SMUFL from ".";
export class Flag {
  note;
  get glyph() {
    return new SMUFL.Glyph(
      SMUFL.getGlyphname(
        "flags",
        (glyphName) =>
          glyphName.includes(this.note.fraction.toString()) &&
          glyphName.includes(this.note.stem!.type)
      )
    );
  }
  constructor({ note }: { note: SMUFL.Note }) {
    this.note = note;
  }
}
