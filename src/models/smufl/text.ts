import { Glyph } from "./glyph";
import Glyphnames from "../../const/smufl/glyphnames.json";

export class Text {
  glyph;
  y;
  x;
  rotate;
  index;
  get width() {
    return this.glyph.bBox.width + this.glyph.advancedWidth;
  }
  get dx() {
    return this.glyph.advancedWidth;
  }

  constructor({
    glyph,
    y,
    x,
    rotate,
    index,
  }: {
    glyph: Glyph<keyof Glyphnames>;
    y?: number;
    x?: number;
    rotate?: number;
    index?: number;
  }) {
    this.glyph = glyph;
    this.y = y ?? 0;
    this.x = x ?? 0;
    this.rotate = rotate ?? 0;
    this.index = index ?? 0;
  }
}
