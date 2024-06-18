import { Event } from "./event";
import { Metaevent } from "./metaevent";
export class Keysignature extends Metaevent {
  /** true: minor false: major*/
  tonality;
  accidental;
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
