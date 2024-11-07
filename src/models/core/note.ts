import * as Core from ".";

export class Note extends Core.Event implements Core.Identifier {
  id;
  pitch;

  constructor({
    id,
    pitch,
    ...element
  }: { id: number; pitch: number } & Core.Event) {
    super(element);
    this.id = id;
    this.pitch = pitch;
  }
}
