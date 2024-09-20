import * as Core from ".";

export class Note extends Core.Element {
  pitch;
  get metaevent() {
    return this.track.score.metaevents.get(this);
  }
  constructor({
    pitch,
    ...element
  }: { pitch: number } & ConstructorParameters<typeof Core.Element>[0]) {
    super(element);
    this.pitch = pitch;
    this.track.score.notes.push(this);
    this.track.notes.push(this);
  }
}
