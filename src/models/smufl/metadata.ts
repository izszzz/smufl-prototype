import Core from "../core";
import * as SMUFL from "./";

export class Metadata extends SMUFL.Rect {
  glyphGrid;

  constructor({ timeSignature }: InstanceType<typeof Core.Metadata>) {
    super();
    this.glyphGrid = new SMUFL.GlyphGrid([
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
    this.width = this.glyphGrid.width;
  }
}
