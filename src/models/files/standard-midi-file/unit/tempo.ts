import * as Core from "core";
import { ValueObject } from "../../../valueobject";
export class Tempo extends ValueObject<number> {
  toBpm() {
    return new Core.Unit.Tempo(Math.floor(60000000 / this.value));
  }
  validate(value: typeof this.value) {
    return value;
  }
}
