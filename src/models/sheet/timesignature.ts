import * as Core from "core";
import { Ligature } from "./ligature";
import { Glyph } from "./glyph";
import { GlyphType } from "sheet";

export class Timesignature extends Core.Timesignature {
  ligature: Ligature | null = null;
  draw() {
    this.ligature = new Ligature(
      [
        [
          new Glyph(GlyphType.Numerator, 4),
          new Glyph(GlyphType.Denominator, 2),
        ],
      ],
      0
    );
  }
}
