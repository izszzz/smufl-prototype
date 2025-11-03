import {
  filter,
  firstBy,
  identity,
  isTruthy,
  last,
  map,
  pipe,
  piped,
  prop,
  reduce,
} from "remeda";
import { Glyph } from "./glyph";
import { Element } from "./element";

export class Ligature<T extends Glyph = Glyph> extends Element {
  constructor(
    public glyphLists: (T | Ligature<T>)[][],
    public line: number = 0,
    ...elementArgs: ConstructorParameters<typeof Element>
  ) {
    super(...elementArgs);
  }
  override get minWidth(): number {
    return pipe(
      this.glyphLists,
      map(piped(map(prop("minWidth")), firstBy([identity(), "desc"]))),
      filter(isTruthy),
      reduce((acc, cur) => acc + (cur as number), 0)
    );
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
              glyph.boundingBox.x = prevMaxWidthGlyph.right;
          }
        return cur;
      },
      null as Ligature["glyphLists"][number] | null
    );
    const lastMaxWidthGlyph = firstBy(last(this.glyphLists) ?? [], [
      prop("width"),
      "desc",
    ]);
    if (lastMaxWidthGlyph) this.boundingBox.width = lastMaxWidthGlyph.right;
  }
}
