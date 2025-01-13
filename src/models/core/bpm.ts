import * as Core from ".";
export class Bpm extends Core.Event {
  value;
  constructor({ value, ...event }: { value: Core.Unit.Bpm } & Core.Event) {
    super(event);
    this.value = value;
  }
}
