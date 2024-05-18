import * as SMUFL from "./";
import { Rest as CoreRest } from "./core/rest";

interface IRest {
  core: CoreRest;
}
export class Rest extends SMUFL.Element implements IRest {
  core;
  constructor({ core }: IRest) {
    const accessory: SMUFL.Element["accessory"] = {
      left: new SMUFL.Glyphs({ glyphs: [] }),
      middle: [],
      right: new SMUFL.Glyphs({ glyphs: [] }),
    };
    super({
      glyph: new SMUFL.Glyph({
        glyphName: SMUFL.getGlyphname("rests", (glyphName) =>
          glyphName.includes(SMUFL.getFractionLiteral(core.fraction))
        ),
      }),
      accessory,
    });
    this.core = core;
  }
}
