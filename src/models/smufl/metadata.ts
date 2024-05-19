import * as Core from "../core";
import * as SMUFL from "./";

export class Metadata extends SMUFL.Rect {
  glyphs;
  constructor({ timeSignature }: Core.Metadata) {
    super();
    this.glyphs = new SMUFL.Glyphs([
      [
        new SMUFL.Glyph({
          glyphName: "gClef",
          y: -1,
        }),
      ],
      [
        new SMUFL.Glyph({
          glyphName: `timeSig${timeSignature.numerator}`,
          y: -3,
        }),
        new SMUFL.Glyph({
          glyphName: `timeSig${timeSignature.denominator}`,
          y: -1,
        }),
      ],
    ]);
    this.width = this.glyphs.width;
  }
}
