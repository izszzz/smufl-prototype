import * as Core from "core";

export class Note extends Core.Event {
  readonly id;
  trackId;
  pitch;
  override get params() {
    return {
      ...super.params,
      id: this.id,
      trackId: this.trackId,
      pitch: this.pitch.value,
    };
  }
  constructor({
    id,
    trackId,
    pitch,
    ...event
  }: {
    id: number;
    trackId: number;
    pitch: Core.Unit.MidiNoteNumber;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = id;
    this.trackId = trackId;
    this.pitch = pitch;
  }
}
