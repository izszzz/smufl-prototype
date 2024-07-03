import Core, { Identifier } from ".";
import { Event } from "./event";

export abstract class Element extends Event implements Identifier {
  id;
  track;
  constructor({
    track,
    ...event
  }: { track: InstanceType<typeof Core.Track> } & ConstructorParameters<
    typeof Core.Event
  >[0]) {
    super(event);
    this.id = Core.createId(track.score.elements);
    this.track = track;
    this.track.score.elements.push(this);
    this.track.elements.push(this);
  }
}
