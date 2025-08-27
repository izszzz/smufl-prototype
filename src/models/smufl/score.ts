import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Score<
  Note extends SMUFL.Note = SMUFL.Note,
  Track extends SMUFL.Track = SMUFL.Track,
  Stave extends SMUFL.Stave = SMUFL.Stave,
  Bar extends SMUFL.Bar = SMUFL.Bar,
  Masterbar extends SMUFL.Masterbar = SMUFL.Masterbar,
  Row extends SMUFL.Row = SMUFL.Row,
  Timesignature extends SMUFL.Timesignature = SMUFL.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Tempo extends Core.Tempo = Core.Tempo,
> extends Sheet.Score<
  Note,
  Track,
  Stave,
  Bar,
  Masterbar,
  Row,
  Timesignature,
  Keysignature,
  Tempo
> {}
