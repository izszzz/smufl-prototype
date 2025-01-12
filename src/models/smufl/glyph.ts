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
    //TODO: Fix
    this.bBox = new SMUFL.BBox(SMUFL.getBBox(glyphName));
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.anchor = SMUFL.getAnchor(glyphName);
    this.glyphName = glyphName;
  }
  static find(
    type: keyof SMUFL.Ranges,
    predicate: (glyph: SMUFL.Ranges[typeof type]["glyphs"][number]) => boolean
  ) {
    return new Glyph(SMUFL.Ranges[type].glyphs.find(predicate)!);
  }
}
