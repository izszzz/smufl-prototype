import * as Core from "../core";
import * as SMUFL from ".";
export class Timesignature extends SMUFL.Rect {
  core;
  glyphs;
  constructor(core: InstanceType<typeof Core.Metaevents.Map.Timesignature>) {
    super();
    this.core = core;
    this.glyphs = [
      new SMUFL.Glyph({
        glyphName: `timeSig${core.numerator}`,
        y: -3,
      }),
      new SMUFL.Glyph({
        glyphName: `timeSig${core.denominator}`,
        y: -1,
      }),
    ];
  }
}
