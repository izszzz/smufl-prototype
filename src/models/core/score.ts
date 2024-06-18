import Core from ".";
import { Event } from "./event";

export class Score extends Event {
  name;
  tracks: InstanceType<typeof Core.Track>[] = [];
  elements: InstanceType<typeof Core.Element>[] = [];
  metaevents;
  constructor({
    name,
    tracks,
    metaevents,
  }: {
    tracks: Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id">[];
    metaevents: ConstructorParameters<typeof Core.Metaevents>[0];
    name?: string;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super();
    this.name = name;
    this.metaevents = new Core.Metaevents(metaevents);
    for (const track of tracks) new Core.Track({ score: this, ...track });
    this.setStart(0);
    this.setEnd(Core.getEventsEnd(this.tracks));
  }
}
