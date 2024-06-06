import * as R from "remeda";
import Core from "./";
import { Event } from "./event";

export class Score extends Event {
  name;
  metadata;
  tracks: InstanceType<typeof Core.Track>[] = [];
  elements: InstanceType<typeof Core.Element>[] = [];
  constructor({
    name,
    tracks,
    metadata,
  }: {
    tracks: Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id">[];
    metadata?: ConstructorParameters<typeof Core.Metadata>[0];
    name?: string;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super();
    this.name = name;
    this.metadata = new Core.Metadata(metadata);
    for (const track of tracks) new Core.Track({ score: this, ...track });
    this.setStart(0);
    this.setEnd(R.firstBy(this.elements, [R.prop("end"), "desc"])?.end ?? 0);
  }
}
