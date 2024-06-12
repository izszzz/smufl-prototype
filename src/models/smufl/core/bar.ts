import * as R from "remeda";
import Core from "../../core";
import { Identifier } from "../../../helpers";

export class Bar extends Core.Event implements Identifier {
  id: Identifier["id"];
  track;
  sequence;
  elements;
  masterbar;
  metaevents;
  get timesignature(): InstanceType<typeof Core.Metaevents.Map.Timesignature> {
    const findedTimesignature = this.metaevents.find(
      (metaevent) => metaevent instanceof Core.Metaevents.Map.Timesignature
    );
    if (findedTimesignature) {
      return findedTimesignature as InstanceType<
        typeof Core.Metaevents.Map.Timesignature
      >;
    } else {
      if (!this.prev) throw new Error();
      return this.prev.timesignature;
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
    this.id = (R.firstBy(track.bars, [R.prop("id"), "desc"])?.id ?? 0) + 1;
    this.track = track;
    this.masterbar = masterbar;
    this.elements = elements;
    this.sequence = new Core.Sequence({ elements, ...event, bar: this });
    this.metaevents = this.masterbar.metaevents;
  }
}
