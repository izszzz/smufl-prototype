import { Timecent } from "./timecent";
import { Unit } from "./unit";

export class Cent extends Unit {
  get hertz() {
    return 8.176 * new Timecent(this.value).seconds.value;
  }
}
