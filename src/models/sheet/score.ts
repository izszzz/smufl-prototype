import * as Core from "core";
import * as Sheet from "sheet";
import * as R from "remeda";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Track extends Sheet.Track = Sheet.Track,
  Stave extends Sheet.Stave = Sheet.Stave,
  Bar extends Sheet.Bar = Sheet.Bar,
  Masterbar extends Sheet.Masterbar = Sheet.Masterbar,
  Row extends Sheet.Row = Sheet.Row,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Bpm> {
  masterbars;
  rows;
  bars;
  staves;
  get height() {
    return this.rows.reduce((acc, cur) => acc + cur.height, 0);
  }
  get width() {
    return R.firstBy(this.rows, [R.prop("width"), "desc"])?.width ?? 0;
  }
  constructor({
    staves,
    bars,
    masterbars,
    rows,
    ...score
  }: {
    staves: Stave[];
    bars: Bar[];
    masterbars: Masterbar[];
    rows: Row[];
  } & ConstructorParameters<
    typeof Core.Score<Note, Track, Timesignature, Keysignature, Bpm>
  >[0]) {
    super(score);
    this.bars = bars;
    this.staves = staves;
    this.rows = rows;
    this.masterbars = masterbars;
    for (const note of this.notes) note.score = this;
    for (const bar of bars) bar.score = this;
    for (const track of this.tracks) track.score = this;
    for (const stave of this.staves) stave.score = this;
    for (const masterbar of this.masterbars) masterbar.score = this;
  }
}
