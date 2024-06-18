import Core from "../../core";
export class Sequence extends Core.Event {
  bar?;
  beats: InstanceType<typeof Core.Beat>[] = [];

  constructor({
    bar,
    elements,
    ...event
  }: {
    bar?: InstanceType<typeof Core.Bar>;
    elements: InstanceType<typeof Core.Element>[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.bar = bar;
    elements.sort((a, b) => a.start - b.start);
    const groupedElements = elements.reduce(
      (acc, cur) => {
        for (const [i, elements] of acc.entries()) {
          const start = Core.getEventsStart(elements);
          const end = Core.getEventsEnd(elements);
          if (start <= cur.start && end > cur.start) {
            acc[i]?.push(cur);
            return acc;
          }
        }
        acc.push([cur]);
        return acc;
      },
      [] as InstanceType<typeof Core.Element>[][]
    );
    this.beats = groupedElements.map(
      (elements) => new Core.Beat({ elements, sequence: this })
    );

    if (this.bar) {
      const events = [{ end: this.start }, ...this.beats, { start: this.end }];
      for (const [i, event] of events.entries()) {
        const prev = events[i - 1];
        if (prev) {
          const prevEnd = prev.end;
          if (event.start !== prevEnd) {
            const rest = new Core.Rest({
              track: this.bar.track,
              start: prevEnd,
              end: event.start,
            });
            this.beats = [
              ...this.beats,
              new Core.Beat({ elements: [rest], sequence: this }),
            ];
            this.bar.elements = [...this.bar.elements, rest];
          }
        }
      }
    }
  }
}
