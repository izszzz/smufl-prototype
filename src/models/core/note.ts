import Core from ".";
import { Element } from "./element";

export class Note extends Element {
  originalPitch;
  get scale() {
    return ((this.originalPitch % 12) + 12) % 12;
  }
  get pitch() {
    if ((this.metaevent.Keysignature.diffKeys as number[]).includes(this.scale))
      return (
        this.originalPitch + (this.metaevent.Keysignature.tonality ? -1 : 1)
      );
    return this.originalPitch;
  }
  get metaevent() {
    return this.track.score.metaevents.get(this);
  }

  constructor({
    pitch,
    ...element
  }: { pitch: number } & ConstructorParameters<typeof Core.Element>[0]) {
    super(element);
    this.originalPitch = pitch;
    this.track.notes.push(this);
  }
}
