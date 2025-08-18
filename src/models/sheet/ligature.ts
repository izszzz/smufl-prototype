import { firstBy, map, pipe, prop, reduce } from "remeda";
import { BoundingBox } from "../boundingbox";
import { Glyph } from "./glyph";

export class Ligature<T extends Glyph = Glyph> extends BoundingBox {
  constructor(
    public glyphsList: (T | Ligature<T>)[][],
    public line: number = 0
  ) {
    super(0, 0, 0, 0);
  }
  draw() {
    // set width
    this.width = pipe(
      this.glyphsList,
      map((glyphs) => firstBy(glyphs, [prop("width"), "desc"])?.width ?? 0),
      reduce((acc, cur) => acc + cur, 0)
    );
    // order children
    pipe(
      this.glyphsList,
      reduce(
        (acc, cur) => {
          if (acc)
            for (const glyph of cur) {
              const maxWidthGlyph = firstBy(acc, [prop("width"), "desc"]);
              glyph.x = (maxWidthGlyph?.x ?? 0) + (maxWidthGlyph?.width ?? 0);
            }
          return cur;
        },
        null as Ligature["glyphsList"][number] | null
      )
    );
  }
}
