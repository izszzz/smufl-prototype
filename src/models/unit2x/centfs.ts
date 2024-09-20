import { Unit } from "./unit";
/**
 * cent full scale
 */
export class Centfs extends Unit {
  get semitone() {
    return this.value / 100;
  }
}
