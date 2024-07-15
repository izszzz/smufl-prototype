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
    const start = Core.getEventsStart(elements);
    const end = Core.getEventsEnd(elements);
    super({
      start,
      end,
      duration: end - start,
    });
    this.sequence = sequence;
    this.element =
      elements.length === 1 && elements[0]
        ? elements[0]
        : new Core.Chord({ elements, beat: this });
  }
}
