import * as Core from ".";

export class Score<
  Note extends Core.Note = Core.Note,
  Track extends Core.Track<Note> = Core.Track<Note>,
  Timesignature extends Core.Timesignature = Core.Timesignature,
  Keysignature extends Core.Keysignature = Core.Keysignature,
  Bpm extends Core.Bpm = Core.Bpm,
> extends Core.Event {
  name;
  timesignatures;
  keysignatures;
  tracks;
  bpms;
  constructor({
    name,
    tracks,
    timesignatures,
    keysignatures,
    bpms,
    ...event
  }: {
    tracks: Track[];
    timesignatures: Timesignature[];
    keysignatures: Keysignature[];
    bpms: Bpm[];
    name?: string;
  } & Core.Event) {
    super(event);
    this.name = name;
    this.timesignatures = timesignatures;
    this.keysignatures = keysignatures;
    this.bpms = bpms;
    this.tracks = tracks;
  }
}
