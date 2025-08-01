import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Score<
  Pitch extends Sheet.Pitch = Sheet.Pitch,
  Note extends SMUFL.Note<Pitch> = SMUFL.Note<Pitch>,
  Track extends SMUFL.Track = SMUFL.Track,
  Stave extends SMUFL.Stave = SMUFL.Stave,
  Bar extends SMUFL.Bar = SMUFL.Bar,
  Masterbar extends SMUFL.Masterbar = SMUFL.Masterbar,
  Row extends SMUFL.Row = SMUFL.Row,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
> extends Sheet.Score<
  Pitch,
  Note,
  Track,
  Stave,
  Bar,
  Masterbar,
  Row,
  Timesignature,
  Keysignature,
  Bpm
> {}
