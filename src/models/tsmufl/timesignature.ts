import * as Core from "../core";
import * as SMUFL from ".";
export class Timesignature extends Core.Timesignature {
  get denominatorGlyph() {
    return new SMUFL.Glyph("timeSig" + this.denominator);
  }
  get numeratorGlyph() {
    return new SMUFL.Glyph("timeSig" + this.numerator);
  }
}
