import * as Core from ".";
export class Sequence extends Core.Event {
  bar?;
  beats: Core.Beat[] = [];

  constructor({
    bar,
    elements,
    ...event
  }: {
    bar?: Core.Bar;
    elements: Core.Element[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.bar = bar;
    elements.sort((a, b) => a.start - b.start);
    const groupedElements = elements.reduce((acc, cur) => {
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
    }, [] as Core.Element[][]);
    this.beats = groupedElements.map(
      (elements) => new Core.Beat({ elements, sequence: this })
    );
    if (groupedElements.flat().some((e) => e.bar?.id === 11))
      console.log("11", groupedElements);

    if (this.bar) {
      const events = [{ end: this.start }, ...this.beats, { start: this.end }];
      for (const [i, event] of events.entries()) {
        const prev = events[i - 1];
        if (prev) {
          const start = prev.end ?? 0;
          const end = event.start ?? 0;
          if (end !== start) {
            const rest = new Core.Rest({
              track: this.bar.track,
              start,
              end,
              duration: end - start,
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
