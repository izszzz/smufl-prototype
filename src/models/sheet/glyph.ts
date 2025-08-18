import { GlyphType } from "sheet";
import { BoundingBox } from "../boundingbox";

export class Glyph extends BoundingBox {
  rotate = 0;
  constructor(
    public type: GlyphType,
    public line: number
  ) {
    super(0, 0, 0, 0);
  }
}
