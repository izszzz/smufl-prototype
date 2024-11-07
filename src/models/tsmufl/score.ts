import * as Core from "../core";
import * as SMUFL from ".";
export class Score extends Core.Score<
  SMUFL.Note,
  SMUFL.Track,
  SMUFL.Timesignature,
  SMUFL.Keysignature,
  SMUFL.Bpm
> {
  masterbars: SMUFL.MasterBar[] = [];
  notes: SMUFL.Note[] = [];
  parts: SMUFL.Part[] = [];
}
