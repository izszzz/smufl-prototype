import * as SMUFL from ".";
export class StaffLines {
  count = 5;
  get glyph() {
    return new SMUFL.Glyph(
      SMUFL.getGlyphname("staves", (glyphName) =>
        glyphName.includes(this.count.toString())
      )
    );
  }
}
