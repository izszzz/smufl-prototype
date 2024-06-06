import * as R from "remeda";
import Core from "../../core";
export class Beat extends Core.Event {
  element;
  sequence;

  constructor({
    elements,
    sequence,
  }: {
    elements: InstanceType<typeof Core.Element>[];
    sequence: InstanceType<typeof Core.Sequence>;
  }) {
    super({
      start: R.firstBy(elements, [(e) => e.start, "asc"])?.start ?? 0,
      end: R.firstBy(elements, [(e) => e.end, "desc"])?.end ?? 0,
    });
    this.sequence = sequence;
    this.element =
      elements.length === 1 && elements[0]
        ? elements[0]
        : new Core.Chord({ elements, beat: this });
  }
}
