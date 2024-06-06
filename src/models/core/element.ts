import * as R from "remeda";
import Core from ".";
import { Event } from "./event";
import { Identifier } from "../../helpers";

export abstract class Element extends Event implements Identifier {
  id: number;
  track;
  constructor({
    track,
    ...event
  }: { track: InstanceType<typeof Core.Track> } & ConstructorParameters<
    typeof Core.Event
  >[0]) {
    super(event);
    this.track = track;
    this.id =
      (R.firstBy(this.track.score.elements, [R.prop("id"), "desc"])?.id ?? 0) +
      1;
    this.track.score.elements = [...this.track.score.elements, this];
    this.track.elements = [...this.track.elements, this];
  }
  getMetadata() {
    return this.track.getMetadata();
  }
}
