import * as R from "remeda";
import * as Core from ".";
export class Chord extends Core.Event {
  elements;
  chord: (Core.Sequence | Core.Element)[];
  beat;
  constructor({
    elements,
    beat,
  }: {
    elements: Core.Element[];
    beat: Core.Beat;
  }) {
    const start = Core.getEventsStart(elements);
    const end = Core.getEventsEnd(elements);
    super({
      start: Core.getEventsStart(elements),
      end: Core.getEventsEnd(elements),
      duration: end - start,
    });
    this.elements = elements;
    this.beat = beat;
    this.chord = elements.filter((e) => e.duration === this.duration);
    const sequence = elements.filter((e) => e.duration !== this.duration);
    if (!R.isEmpty(sequence))
      this.chord.push(
        new Core.Sequence({
          elements: sequence,
          bar: beat.sequence.bar,
          start: this.start,
          duration: this.duration,
          end: this.end,
        })
      );
  }
}
