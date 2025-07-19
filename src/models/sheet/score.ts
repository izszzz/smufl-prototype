import * as Core from "core";
import * as Sheet from "sheet";
import * as R from "remeda";

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
  Row extends Sheet.Row<Masterbar> = Sheet.Row<Masterbar>,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Bpm> {
  masterbars: Masterbar[] = [];
  rows: Row[] = [];
  get height() {
    return this.rows.reduce((acc, cur) => acc + cur.height, 0);
  }
  get width() {
    return R.firstBy(this.rows, [R.prop("width"), "desc"])?.width ?? 0;
  }
}
