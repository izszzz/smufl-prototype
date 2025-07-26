import * as Core from "core";

export class Note extends Core.Event {
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
    pitch: Core.Unit.Pitch;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.trackId = trackId;
    this.pitch = pitch;
  }
}
