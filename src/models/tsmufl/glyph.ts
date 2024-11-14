import * as SMUFL from "smufl";

export class Glyph<T extends keyof SMUFL.Glyphnames> {
  bBox;
  advancedWidth;
  glyphName;
  anchor;
  get codepoint() {
    return parseInt(
      SMUFL.Glyphnames[this.glyphName].codepoint.replace("U+", ""),
      16
    );
  }
  constructor(glyphName: T) {
    this.bBox = new SMUFL.BBox(SMUFL.getBBox(glyphName));
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.anchor = SMUFL.getAnchor(glyphName);
    this.glyphName = glyphName;
  }
}
