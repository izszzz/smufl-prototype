import Core from "../core";
import * as SMUFL from ".";
import * as R from "remeda";
export class Keysignature extends SMUFL.Rect {
  core;
  glyphs;
  constructor(core: InstanceType<typeof Core.Metaevents.Map.Keysignature>) {
    super();
    this.core = core;
    this.glyphs = R.times(
      Math.abs(core.accidental),
      () =>
        new SMUFL.Glyph({
          glyphName: core.accidental > 0 ? "accidentalSharp" : "accidentalFlat",
          y: -3,
        })
    );
  }
}
