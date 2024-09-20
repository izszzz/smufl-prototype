import { Unit } from "./unit";

export class Pitch extends Unit {
  get pitchClass() {
    const keysLength = 12;
    return ((this.value % keysLength) + keysLength) % keysLength;
  }
}
