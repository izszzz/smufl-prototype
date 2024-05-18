import * as R from "remeda";
import * as SMUFL from "./";

interface IGlyphs {
  columns: SMUFL.Glyph[][];
}

export class Glyphs implements IGlyphs, SMUFL.IBox {
  height = 0;
  columns;
  get width() {
    return R.pipe(
      this.columns,
      R.map((g) => R.firstBy(g, [R.prop("width"), "desc"])?.width),
      R.filter(R.isTruthy),
      R.reduce(R.add, 0)
    );
  }
  constructor({ columns }: IGlyphs) {
    this.columns = columns;
  }
}
