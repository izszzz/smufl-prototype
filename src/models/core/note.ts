import * as Core from "core";

export class Note extends Core.Event {
  trackId;
  pitch;
  velocity;
  override get params() {
    return {
      ...super.params,
      trackId: this.trackId,
      pitch: this.pitch.value,
      velocity: this.velocity,
    };
  }
  constructor({
    trackId,
    pitch,
    velocity,
    ...event
  }: {
    trackId: number;
    velocity: number;
    pitch: Core.Units.MidiNoteNumber;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.trackId = trackId;
    this.pitch = pitch;
    this.velocity = velocity;
  }
}
