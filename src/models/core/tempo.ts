import * as Core from "core";

export class Tempo extends Core.Event {
  value;
  override get params() {
    return {
      ...super.params,
      value: this.value.value,
    };
  }
  constructor({
    value,
    ...event
  }: { value: Core.Units.Tempo } & ConstructorParameters<
    typeof Core.Event
  >[0]) {
    super(event);
    this.value = value;
  }
}
