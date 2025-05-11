import * as Core from "core";
import * as Sheet from "sheet";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Track extends Sheet.Track<Note> = Sheet.Track<Note>,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
  Stave extends Sheet.Stave = Sheet.Stave,
  Masterbar extends Sheet.Masterbar<
    Note,
    Stave,
    Sheet.Bar<Note, Stave>
  > = Sheet.Masterbar<Note, Stave, Sheet.Bar<Note, Stave>>,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Bpm> {
  masterbars: Masterbar[] = [];
  layout: "page" | "vertical" | "horizontal" = "horizontal";
}
