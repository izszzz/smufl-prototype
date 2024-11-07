import * as Core from "../core";
import * as R from "remeda";
import * as SMUFL from ".";
export class Keysignature extends Core.Keysignature {
  glyphs = R.times(
    Math.abs(this.accidental),
    () =>
      new SMUFL.Glyph(
        this.accidental > 0 ? "accidentalSharp" : "accidentalFlat"
      )
  );
}
