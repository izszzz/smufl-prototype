import * as SMUFL from "./";

export class Accessory extends SMUFL.Rect {
  left;
  right;
  middle: SMUFL.Glyph[] = [];
  target: SMUFL.Glyph | null = null;
  glyphGrid;

  constructor({
    left,
    right,
    middle,
    target,
  }: {
    left: SMUFL.Glyph[][];
    right: SMUFL.Glyph[][];
    middle: SMUFL.Glyph[];
    target: SMUFL.Glyph;
  }) {
    super();
    this.left = new SMUFL.GlyphGrid(left);
    this.right = new SMUFL.GlyphGrid(right);
    this.middle = middle;
    this.target = target;
    this.glyphGrid = new SMUFL.GlyphGrid([
      ...this.left.columns.map((column) => column.glyphs),
      [...this.middle, this.target],
      ...this.right.columns.map((column) => column.glyphs),
    ]);
    this.width = this.glyphGrid.width;
  }
}
