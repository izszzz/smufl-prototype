import * as Core from "core";

export class Keysignature extends Core.Keysignature {
  override get accidentalPitchClasses() {
    return super.accidentalPitchClasses.reverse();
  }
}
