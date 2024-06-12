import { Event } from "./event";
import { Metaevent } from "./metaevent";
export class Bpm extends Metaevent {
  value;
  constructor({
    value,
    ...event
  }: { value: number } & ConstructorParameters<typeof Event>[0]) {
    super(event);
    this.value = value;
  }
}
