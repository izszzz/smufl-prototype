import * as SMUFL from "./";
import { Rest as CoreRest } from "./core/rest";

export class Rest extends SMUFL.Element {
  constructor({ core }: { core: CoreRest }) {
    super({
      core,
    });
    this.glyph = new SMUFL.Glyph({
      glyphName: SMUFL.getGlyphname("rests", (glyphName) =>
        glyphName.includes(SMUFL.getFractionLiteral(this.fraction))
      ),
    });
    this.accessory = new SMUFL.Accessory({
      target: this.glyph,
      left: [],
      middle: [],
      right: (() => {
        const glyphs = [];
        if (0 < this.dot)
          glyphs.push([new SMUFL.Glyph({ glyphName: "augmentationDot" })]);
        return glyphs;
      })(),
    });
    this.init();
  }
}
