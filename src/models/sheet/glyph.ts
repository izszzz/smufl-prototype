import { GlyphType } from "sheet";
import { Element } from "./element";

export class Glyph extends Element {
  constructor(
    public type: GlyphType,
    public line: number
  ) {
    super();
  }
}
