import * as Core from ".";

export class Element extends Core.Event implements Core.Identifier {
  id;
  track;
  constructor({
    track,
    ...event
  }: { track: Core.Track } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = Core.createId(track.score.notes);
    this.track = track;
    this.track.score.notes.push(this);
    this.track.elements.push(this);
  }
}
