import { Unit } from "./unit";

export class Decibel extends Unit {
  get linearVolume() {
    return Math.pow(10, this.value / 20);
  }
}
