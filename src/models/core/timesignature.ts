import * as Core from "core";
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
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.denominator = denominator;
    this.numerator = numerator;
  }
}
