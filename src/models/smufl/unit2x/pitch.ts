import * as Unit2X from "../../unit2x";

export class Pitch extends Unit2X.Unit {
  get keysLength() {
    return 12;
  }
  get pitchClass() {
    return ((this.value % this.keysLength) + this.keysLength) % this.keysLength;
  }
  get octave() {
    return Math.trunc(this.value / this.keysLength) - 1;
  }
}
