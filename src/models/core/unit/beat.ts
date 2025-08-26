import { ValueObject } from "../../valueobject";
import { Tempo } from "./tempo";

export class Beat extends ValueObject<number> {
  static add(a: Beat, b: Beat) {
    return new Beat(a.value + b.value);
  }
  static subtract(a: Beat, b: Beat) {
    return new Beat(a.value - b.value);
  }
  toSeconds(tempo: Tempo) {
    return (60 * this.value) / tempo.value;
  }
  validate(value: typeof this.value) {
    return value;
  }
}
