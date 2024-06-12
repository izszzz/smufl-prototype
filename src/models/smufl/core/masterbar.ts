import { Identifier } from "../../../helpers";
import * as R from "remeda";
import Core from "../../core";

export class MasterBar extends Core.Event implements Identifier {
  id: Identifier["id"];
  bars;
  sequence;
  elements;
  score;
  metaevents;

  constructor({
    score,
    elements,
    ...event
  }: {
    score: InstanceType<typeof Core.Score>;
    elements: InstanceType<typeof Core.Element>[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.score = score;
    this.id =
      (R.firstBy(this.score.masterbars, [R.prop("id"), "desc"])?.id ?? 0) + 1;
    this.metaevents = this.score.metaevents.find(this);
    this.bars = score.tracks.map((track) => {
      const bar = new Core.Bar({
        track,
        masterbar: this,
        elements: elements.filter((element) => element.track.id === track.id),
        ...event,
      });
      for (const note of bar.elements) note.bar = bar;
      track.bars.push(bar);
      return bar;
    });
    this.elements = this.bars.flatMap((bar) => bar.elements);
    this.sequence = new Core.Sequence({ elements: this.elements });
  }
}
