import * as Core from "./core";
import * as SMUFL from ".";
import * as R from "remeda";
import Metadata from "./metadata.json";
export class Keysignature extends SMUFL.Rect {
  core;
  glyphs;
  constructor(core: InstanceType<typeof Core.Metaevents.Map.Keysignature>) {
    super();
    this.core = core;
    this.glyphs = R.times(
      Math.abs(core.accidental),
      (i) =>
        new SMUFL.Glyph({
          glyphName: core.accidental > 0 ? "accidentalSharp" : "accidentalFlat",
          y:
            Metadata.clef.treble.keysignature[
              core.accidental > 0 ? "sharp" : "flat"
            ].y -
            Metadata.keysignature[core.accidental > 0 ? "sharp" : "flat"][i] *
              0.5,
        })
    );
  }
}
