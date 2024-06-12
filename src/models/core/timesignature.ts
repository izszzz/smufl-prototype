import { Event } from "./event";
import { Metaevent } from "./metaevent";
export class Timesignature extends Metaevent {
  denominator;
  numerator;
  constructor({
    denominator,
    numerator,
    ...event
  }: {
    denominator: number;
    numerator: number;
  } & ConstructorParameters<typeof Event>[0]) {
    super(event);
    this.denominator = denominator;
    this.numerator = numerator;
  }
}
