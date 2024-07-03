import Core, { Identifier } from "../../core";

export class Bar extends Core.Event implements Identifier {
  id;
  track;
  sequence;
  elements;
  masterbar;
  metaevents;
  get timesignature(): InstanceType<typeof Core.Metaevents.Map.Timesignature> {
    if (this.metaevents.Timesignature) return this.metaevents.Timesignature;
    else {
      if (!this.prev) throw new Error();
      return this.prev.timesignature;
    }
  }
  get keysignature(): InstanceType<typeof Core.Metaevents.Map.Keysignature> {
    if (this.metaevents.Keysignature) return this.metaevents.Keysignature;
    else {
      if (!this.prev) throw new Error();
      return this.prev!.keysignature;
    }
  }
  private get findedIndex() {
    return this.track.bars.findIndex((bar) => bar.id === this.id);
  }
  get prev() {
    return this.track.bars[this.findedIndex - 1];
  }
  get next() {
    return this.track.bars[this.findedIndex + 1];
  }
  constructor({
    track,
    masterbar,
    elements,
    ...event
  }: {
    track: InstanceType<typeof Core.Track>;
    masterbar: InstanceType<typeof Core.MasterBar>;
    elements: InstanceType<typeof Core.Element>[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = Core.createId(track.bars);
    this.track = track;
    this.masterbar = masterbar;
    this.elements = elements;
    this.sequence = new Core.Sequence({ elements, ...event, bar: this });
    this.metaevents = this.masterbar.metaevents;
  }
}
