import { Unit } from "./unit";

export class Timecent extends Unit {
  get seconds() {
    return Math.pow(2, this.value / 1200);
  }
}
