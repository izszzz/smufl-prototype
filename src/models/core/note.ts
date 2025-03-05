import * as Core from "core";

export class Note extends Core.Event implements Core.Identifier {
  id;
  pitch;
  constructor({
    id,
    pitch,
    ...event
  }: { id: number; pitch: Core.Unit.Pitch } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.pitch = pitch;
  }
}
