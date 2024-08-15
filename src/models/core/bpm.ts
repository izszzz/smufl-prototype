import * as Core from ".";
export class Bpm extends Core.Metaevent {
  value;
  constructor({
    value,
    ...event
  }: { value: number } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.value = value;
  }
}
