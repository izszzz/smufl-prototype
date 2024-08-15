import * as Core from ".";
export class Timesignature extends Core.Metaevent {
  denominator;
  numerator;
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
