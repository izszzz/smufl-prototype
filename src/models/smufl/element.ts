import * as SMUFL from "./";
interface IElement {
  accessory: {
    left: SMUFL.Glyphs;
    middle: SMUFL.Glyph[];
    right: SMUFL.Glyphs;
  };
  glyph: SMUFL.Glyph;
  glyphs: SMUFL.Glyphs;
}

export class Element implements IElement, SMUFL.IPosition, SMUFL.IBox {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  accessory;
  spacing = new SMUFL.Spacing();
  glyph;
  glyphs;
  constructor({ glyph, accessory }: Omit<IElement, "glyphs">) {
    this.glyph = glyph;
    this.accessory = accessory;
    this.glyphs = new SMUFL.Glyphs({
      glyphs: [
        ...accessory.left.glyphs,
        [...accessory.middle, glyph],
        ...accessory.right.glyphs,
      ],
    });
  }
}
