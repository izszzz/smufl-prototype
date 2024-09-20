import { Decibel } from "./decibel";
import { Unit } from "./unit";

export class Centibel extends Unit {
  get decibel() {
    return new Decibel(this.value * 10);
  }
}
