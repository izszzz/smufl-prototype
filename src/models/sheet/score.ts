import * as Core from "core";
import * as Sheet from "sheet";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Track extends Sheet.Track<Note> = Sheet.Track<Note>,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Bpm> {}
