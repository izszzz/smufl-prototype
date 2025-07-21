import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Score<
  Note extends SMUFL.Note = SMUFL.Note,
  Stave extends SMUFL.Stave = SMUFL.Stave,
  Bar extends SMUFL.Bar = SMUFL.Bar,
  Track extends Sheet.Track = Sheet.Track,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
  Masterbar extends SMUFL.Masterbar = SMUFL.Masterbar,
  Row extends SMUFL.Row = SMUFL.Row,
> extends Sheet.Score<
  Note,
  Stave,
  Bar,
  Track,
  Timesignature,
  Keysignature,
  Bpm,
  Masterbar,
  Row
> {}
