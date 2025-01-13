import * as Core from ".";

export class Note extends Core.Event implements Core.Identifier {
  id;
  pitch;
  constructor({
    id,
    pitch,
    ...element
  }: { id: number; pitch: Core.Unit.Pitch } & Core.Event) {
    super(element);
    this.id = id;
    this.pitch = pitch;
  }
}
