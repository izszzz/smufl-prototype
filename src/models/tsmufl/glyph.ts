import * as SMUFL from ".";

export class Glyph<T extends keyof SMUFL.Glyphnames = keyof SMUFL.Glyphnames> {
  bBox;
  advancedWidth;
  glyphName;
  get codepoint() {
    return parseInt(
      SMUFL.Glyphnames[this.glyphName].codepoint.replace("U+", ""),
      16
    );
  }
  constructor(glyphName: T) {
    this.bBox = new SMUFL.BBox(SMUFL.getBBox(glyphName));
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.glyphName = glyphName;
  }
}
