import * as Core from ".";
export class Bpm extends Core.Event {
  value;
  constructor({ value, ...event }: { value: number } & Core.Event) {
    super(event);
    this.value = value;
  }
}
