import * as SMUFL from "./";
import { Rest as CoreRest } from "./core/rest";

interface IRest {
  core: CoreRest;
}
export class Rest extends SMUFL.Element<CoreRest> implements IRest {
  constructor({ core }: IRest) {
    super({
      core,
      accessory: new SMUFL.Accessory({
        left: [],
        middle: [],
        right: [],
        target: new SMUFL.Glyph({
          glyphName: SMUFL.getGlyphname("rests", (glyphName) =>
            glyphName.includes(SMUFL.getFractionLiteral(core.fraction))
          ),
        }),
      }),
    });
  }
}
