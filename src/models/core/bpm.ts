import * as Core from "core";

export class Bpm extends Core.Event {
  value;
  constructor({
    value,
    ...event
  }: { value: Core.Unit.Bpm } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);

    this.value = value;
  }
}
