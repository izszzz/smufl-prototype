import * as Core from ".";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  track;
  sequence;
  elements;
  masterbar;
  get prev() {
    return this.masterbar.prev?.bars.find((bar) => bar.track.id, this.track.id);
  }
  get next() {
    return this.masterbar.next?.bars.find((bar) => bar.track.id, this.track.id);
  }
  constructor({
    track,
    masterbar,
    elements,
    ...event
  }: {
    track: Core.Track;
    masterbar: Core.MasterBar;
    elements: Core.Element[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = Core.createId(track.bars);
    this.track = track;
    this.masterbar = masterbar;
    this.elements = elements;
    this.sequence = new Core.Sequence({ elements, ...event, bar: this });
  }
}
