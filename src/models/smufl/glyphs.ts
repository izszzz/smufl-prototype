import * as R from "remeda";
import * as SMUFL from "./";

interface IGlyphs {
  columns: SMUFL.Glyph[][];
}

export class Glyphs extends SVGRect implements IGlyphs {
  columns;
  constructor({ columns }: IGlyphs) {
    super();
    this.columns = columns;
    this.width = R.pipe(
      this.columns,
      R.map((g) => R.firstBy(g, [R.prop("width"), "desc"])?.width),
      R.filter(R.isTruthy),
      R.reduce(R.add, 0)
    );
  }
}
