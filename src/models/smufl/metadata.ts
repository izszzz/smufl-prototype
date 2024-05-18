import * as Core from "../core";
import * as SMUFL from "./";

export class Metadata extends SVGRect {
  glyphs;
  constructor({ timeSignature }: Core.Metadata) {
    super();
    this.glyphs = new SMUFL.Glyphs({
      columns: [
        [
          new SMUFL.Glyph({
            glyphName: "gClef",
          }),
        ],
        [
          new SMUFL.Glyph({
            glyphName: `timeSig${timeSignature.numerator}`,
          }),
          new SMUFL.Glyph({
            glyphName: `timeSig${timeSignature.denominator}`,
            y: -2,
          }),
        ],
      ],
    });
    this.width = this.glyphs.width;
  }
}
