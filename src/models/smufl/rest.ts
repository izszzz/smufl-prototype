import * as Core from "../core";
import * as SMUFL from "./";

interface IRest {
  core: Core.Rest;
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
        glyphName: SMUFL.findGlyphname("rests", (glyphName) =>
          glyphName.includes(SMUFL.findFractionLiteral(core.fraction))
        ),
      }),
      accessory,
    });
    this.core = core;
  }
}
