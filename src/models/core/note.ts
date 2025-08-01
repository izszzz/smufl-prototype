import * as Core from "core";

export class Note<Pitch extends Core.Pitch = Core.Pitch> extends Core.Event {
  readonly id;
  trackId;
  pitch;
  constructor({
    id,
    trackId,
    pitch,
    ...event
  }: {
    id: number;
    trackId: number;
    pitch: Pitch;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.trackId = trackId;
    this.pitch = pitch;
  }
}
