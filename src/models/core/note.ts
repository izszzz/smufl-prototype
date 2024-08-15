import * as Core from ".";

export class Note extends Core.Element {
  originalPitch;
  get pitchClass() {
    return ((this.originalPitch % 12) + 12) % 12;
  }
  get pitch() {
    if (
      (this.metaevent.Keysignature.diffKeys as number[]).includes(
        this.pitchClass
      )
    )
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
