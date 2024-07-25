import * as R from "remeda";
import * as SMUFL from ".";

class Column extends SMUFL.Rect {
  glyphs: SMUFL.Glyph[];
  advancedWidth;
  constructor(glyphs: SMUFL.Glyph[]) {
    super();
    this.glyphs = glyphs;
    this.width =
      R.firstBy(this.glyphs, [(g) => g.bBox.width, "desc"])?.bBox.width ?? 0;
    this.advancedWidth =
      R.firstBy(this.glyphs, [(g) => g.advancedWidth, "desc"])?.advancedWidth ??
      0;
  }
}

export class GlyphGrid extends SMUFL.Rect {
  columns;
  constructor(grid: SMUFL.Glyph[][]) {
    super();
    this.columns = grid.map((g) => new Column(g));
    this.width = R.pipe(
      this.columns,
      R.map(R.prop("width")),
      R.reduce((acc, cur) => R.add(acc, cur), 0)
    );
  }

  static Column = Column;
}
