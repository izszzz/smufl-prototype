import * as Core from "core";

export class Score<
  Pitch extends Core.Pitch = Core.Pitch,
  Note extends Core.Note<Pitch> = Core.Note<Pitch>,
  Track extends Core.Track = Core.Track,
  Timesignature extends Core.Timesignature = Core.Timesignature,
  Keysignature extends Core.Keysignature = Core.Keysignature,
  Bpm extends Core.Bpm = Core.Bpm,
> extends Core.Event {
  name;
  timesignatures;
  keysignatures;
  bpms;
  tracks;
  notes;
  constructor({
    name,
    tracks,
    notes,
    timesignatures,
    keysignatures,
    bpms,
    ...event
  }: {
    tracks: Track[];
    notes: Note[];
    timesignatures: Timesignature[];
    keysignatures: Keysignature[];
    bpms: Bpm[];
    name?: string;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.name = name;
    this.timesignatures = timesignatures;
    this.keysignatures = keysignatures;
    this.bpms = bpms;
    this.tracks = tracks;
    this.notes = notes;
    for (const track of this.tracks) track.score = this;
  }
}
