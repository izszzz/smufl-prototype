import { Unit } from "./unit";

export class Tempo extends Unit {
  get bpm() {
    return Math.floor(60000000 / this.value);
  }
}
