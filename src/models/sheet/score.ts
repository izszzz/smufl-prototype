import * as Core from "core";
import * as Sheet from "sheet";

export class Score extends Core.Score<
  Sheet.Note,
  Sheet.Track,
  Sheet.Timesignature,
  Sheet.Keysignature,
  Sheet.Bpm
> {}
