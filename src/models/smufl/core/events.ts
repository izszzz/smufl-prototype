import * as R from "remeda";
import { Event } from "../../core/event";
export class Events<T extends Event> extends Event {
  elements: T[];
  gaps: Event[] = [];
  constructor({
    events,
    ...event
  }: { events: T[] } & ConstructorParameters<typeof Event>[0]) {
    super(event);
    this.elements = events;
  }
  push(...events: T[]) {
    this.elements.push(...events);
    this.elements.sort((a, b) => a.start - b.start);
    this.setStart(
      R.firstBy(this.elements, [R.prop("start"), "asc"])?.start ?? 0
    );
    this.setEnd(R.firstBy(this.elements, [R.prop("end"), "desc"])?.end ?? 0);
    for (const [i, element] of [
      { end: this.start },
      ...this.elements,
      { start: this.end },
    ].entries()) {
      const prev = element[i - 1];
    }
  }
}
