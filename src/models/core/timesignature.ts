import * as Core from "core";
export class Timesignature extends Core.Event {
  denominator;
  numerator;
  get width() {
    return this.duration.value / this.numerator;
  }
  override get params() {
    return {
      ...super.params,
      denominator: this.denominator,
      numerator: this.numerator,
    };
  }
  constructor({
    denominator,
    numerator,
    ...event
  }: {
    denominator: number;
    numerator: number;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.denominator = denominator;
    this.numerator = numerator;
  }
}
