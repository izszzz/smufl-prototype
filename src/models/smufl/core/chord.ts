import * as R from "remeda";
import Core from "../../core";
export class Chord extends Core.Event {
  elements;
  chord: (
    | InstanceType<typeof Core.Sequence>
    | InstanceType<typeof Core.Element>
  )[];
  beat;
  constructor({
    elements,
    beat,
  }: {
    elements: InstanceType<typeof Core.Element>[];
    beat: InstanceType<typeof Core.Beat>;
  }) {
    super({
      start: R.firstBy(elements, [(e) => e.start, "asc"])?.start ?? 0,
      end: R.firstBy(elements, [(e) => e.end, "desc"])?.end ?? 0,
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
          end: this.end,
        })
      );
  }
}
