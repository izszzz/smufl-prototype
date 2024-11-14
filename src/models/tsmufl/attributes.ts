import * as SMUFL from "smufl";
export class Attributes {
  get clef() {
    return this.bar.track.clef;
  }
  get timesignature() {
    return this.bar.masterbar.timesignature;
  }
  get keysignature() {
    return this.bar.masterbar.keysignature;
  }

  constructor(public bar: SMUFL.Bar) {}
}
