import * as Core from ".";
export class Timesignature extends Core.Event {
  denominator;
  numerator;
  constructor({
    denominator,
    numerator,
    ...event
  }: {
    denominator: number;
    numerator: number;
  } & Core.Event) {
    super(event);
    this.denominator = denominator;
    this.numerator = numerator;
  }
}
