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
      start: Core.getEventsStart(elements),
      end: Core.getEventsEnd(elements),
    });
    this.sequence = sequence;
    this.element =
      elements.length === 1 && elements[0]
        ? elements[0]
        : new Core.Chord({ elements, beat: this });
  }
}
