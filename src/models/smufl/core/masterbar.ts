import * as Core from ".";

export class MasterBar extends Core.Event implements Core.Identifier {
  id;
  bars;
  sequence;
  elements;
  score;
  metaevents;
  get timesignature(): InstanceType<typeof Core.Metaevents.Map.Timesignature> {
    if (this.metaevents.Timesignature) return this.metaevents.Timesignature;
    else {
      if (!this.prev) throw new Error();
      return this.prev.timesignature;
    }
  }
  private get index() {
    return this.score.masterbars.findIndex((bar) => bar.id === this.id);
  }
  get prev() {
    return this.score.masterbars[this.index - 1];
  }
  get next() {
    return this.score.masterbars[this.index + 1];
  }
  constructor({
    score,
    elements,
    ...event
  }: {
    score: Core.Score;
    elements: Core.Element[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = Core.createId(score.masterbars);
    this.score = score;
    this.metaevents = this.score.metaevents.find(this);
    this.bars = score.tracks.map((track) => {
      const bar = new Core.Bar({
        track,
        masterbar: this,
        elements: elements.filter((element) => element.track.id === track.id),
        ...event,
      });
      for (const element of bar.elements) element.bar = bar;
      track.bars.push(bar);
      return bar;
    });
    this.elements = this.bars.flatMap((bar) => bar.elements);
    this.sequence = new Core.Sequence({ elements: this.elements, ...event });
  }
}
