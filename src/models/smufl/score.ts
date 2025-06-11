import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Stave extends SMUFL.Stave = SMUFL.Stave,
  Bar extends Sheet.Bar<Note, Stave> = Sheet.Bar<Note, Stave>,
  Track extends Sheet.Track<Note, Bar> = Sheet.Track<Note, Bar>,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
> extends Sheet.Score<Note, Track, Timesignature, Keysignature, Bpm, Stave> {}
