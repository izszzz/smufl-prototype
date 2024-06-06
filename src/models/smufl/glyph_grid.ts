import * as R from "remeda";
import * as SMUFL from ".";

class Column extends SMUFL.Rect {
  glyphs: SMUFL.Glyph[];
  constructor(glyphs: SMUFL.Glyph[]) {
    super();
    this.glyphs = glyphs;
    this.width =
      R.firstBy(this.glyphs, [(g) => g.bBox.width, "desc"])?.bBox.width ?? 0;
  }
}

export class GlyphGrid extends SMUFL.Rect {
  columns;
  constructor(grid: SMUFL.Glyph[][]) {
    super();
    this.columns = grid.map((g) => new Column(g));
    for (const [i, column] of this.columns.entries()) {
      const prev = this.columns[i - 1];
      if (prev) column.x = prev.x + prev.width;
    }
    this.width = R.pipe(
      this.columns,
      R.map(R.prop("width")),
      R.reduce(R.add, 0)
    );
  }

  static Column = Column;
}
