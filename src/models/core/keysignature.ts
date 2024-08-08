import { Event } from "./event";
import Metadata from "./metadata.json";
import { Metaevent } from "./metaevent";
export class Keysignature extends Metaevent {
  /**
   * - `true`: minor
   * - `false`: major
   */
  tonality;
  accidental;
  get diffKeys() {
    return Metadata.keysignature[this.tonality ? "minor" : "major"].slice(
      0,
      Math.abs(this.accidental)
    );
  }
  constructor({
    tonality,
    accidental,
    ...event
  }: {
    accidental: number;
    tonality: boolean;
  } & ConstructorParameters<typeof Event>[0]) {
    super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
