import * as Core from ".";

export class Score extends Core.Event {
  name;
  metaevents;
  tracks: Core.Track[] = [];
  elements: Core.Element[] = [];
  constructor({
    name,
    tracks,
    metaevents,
    ...event
  }: {
    tracks: Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id">[];
    metaevents: ConstructorParameters<typeof Core.Metaevents>[0];
    name?: string;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.name = name;
    this.metaevents = new Core.Metaevents(metaevents);
    for (const track of tracks) new Core.Track({ score: this, ...track });
  }
}
