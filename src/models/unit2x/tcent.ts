import { Centfs } from "./centfs";
import { Unit } from "./unit";

/**
 * transepose cent per key
 */
export class TCent extends Unit {
  get semitone() {
    return new Centfs(this.value).semitone;
  }
}
