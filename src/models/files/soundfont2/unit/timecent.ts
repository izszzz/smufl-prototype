import { Seconds } from "./seconds";
import { Unit } from "./unit";

export class Timecent extends Unit {
  get seconds() {
    return new Seconds(Math.pow(2, this.value / 1200));
  }
}
