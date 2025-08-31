import { firstBy, last, prop } from "remeda";
import { Glyph } from "./glyph";
import { Element } from "./element";

export class Ligature<T extends Glyph = Glyph> extends Element {
  constructor(
    public glyphLists: (T | Ligature<T>)[][],
    public line: number = 0
  ) {
    super();
  }
  order() {
    this.glyphLists.reduce(
      (acc, cur) => {
        for (const glyphOrLigature of cur)
          if (glyphOrLigature instanceof Ligature) glyphOrLigature.order();
        if (acc)
          for (const glyph of cur) {
            const prevMaxWidthGlyph = firstBy(acc, [prop("width"), "desc"]);
            if (prevMaxWidthGlyph)
              glyph.boundingBox.x =
                prevMaxWidthGlyph.boundingBox.x + prevMaxWidthGlyph.width;
          }
        return cur;
      },
      null as Ligature["glyphLists"][number] | null
    );
    const lastMaxWidthGlyph = firstBy(last(this.glyphLists) ?? [], [
      prop("width"),
      "desc",
    ]);
    this.boundingBox.width = lastMaxWidthGlyph
      ? lastMaxWidthGlyph.boundingBox.x + lastMaxWidthGlyph.width
      : 0;
  }
}
