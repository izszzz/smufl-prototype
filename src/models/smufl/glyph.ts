import * as SMUFL from "./";

interface IGlyph<T> {
  glyphName: T;
}
export class Glyph<T extends keyof SMUFL.Glyphnames = keyof SMUFL.Glyphnames>
  implements IGlyph<T>, SMUFL.IPosition, SMUFL.IBox
{
  glyphName;
  x;
  y;
  width;
  height;
  get staffWidth(): number {
    return SMUFL.Staff.getStaffGlyph(this.width).width;
  }
  constructor({ glyphName, x, y }: IGlyph<T> & Partial<SMUFL.IPosition>) {
    const { width, height } = this.#getBBoxByGlyphName(glyphName);
    this.glyphName = glyphName;
    this.width = width;
    this.height = height;
    this.x = x ?? 0;
    this.y = y ?? 0;
  }
  #getBBoxByGlyphName = (glyphName: keyof SMUFL.Glyphnames) => {
    const { bBoxNE, bBoxSW } =
      SMUFL.BravuraMetadata.glyphBBoxes[
        glyphName as keyof SMUFL.BravuraMetadata["glyphBBoxes"]
      ];
    const width = bBoxNE[0] - bBoxSW[0];
    const height = bBoxNE[1] - bBoxSW[1];
    return { /*x: bBoxNE[0], y: bBoxSW[1], */ width, height };
  };
}
