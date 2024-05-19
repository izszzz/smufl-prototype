import * as R from "remeda";
import * as SMUFL from "./";

interface IGlyphs {
  columns: SMUFL.Glyph[][];
}

export class Glyphs extends SMUFL.Rect implements IGlyphs {
  columns;
  constructor(columns: SMUFL.Glyph[][]) {
    super();
    this.columns = columns;
    this.width = R.pipe(
      this.columns,
      R.map((g) => R.firstBy(g, [(g) => g.bBox.width, "desc"])?.bBox.width),
      R.filter(R.isTruthy),
      R.reduce(R.add, 0)
    );
  }
}
