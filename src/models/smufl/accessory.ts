import * as SMUFL from "./";
interface IAccessory {
  left: SMUFL.Glyphs;
  middle: SMUFL.Glyph[];
  right: SMUFL.Glyphs;
  target: SMUFL.Glyph;
}
interface IConstructor {
  left?: SMUFL.Glyph[][];
  middle?: SMUFL.Glyph[];
  right?: SMUFL.Glyph[][];
  target: SMUFL.Glyph;
}
export class Accessory implements IAccessory {
  left;
  middle;
  right;
  target;
  glyphs;
  constructor({ target, left = [], middle, right = [] }: IConstructor) {
    this.left = new SMUFL.Glyphs(left);
    this.right = new SMUFL.Glyphs(right);
    this.middle = middle ?? [];
    this.target = target;
    this.glyphs = new SMUFL.Glyphs([
      ...this.left.columns,
      [...this.middle, target],
      ...this.right.columns,
    ]);
  }
}
