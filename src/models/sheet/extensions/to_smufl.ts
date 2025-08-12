import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: () => SMUFL.Score;
  }
}

Sheet.Score.prototype.toSMUFL = function (this: Sheet.Score) {
  const score = new SMUFL.Score({
    ...this,
    tracks: this.tracks.map((row) => new SMUFL.Track(row)),
    masterbars: this.masterbars.map(
      (masterbar) => new SMUFL.Masterbar(masterbar)
    ),
    rows: this.rows.map((row) => new SMUFL.Row(row)),
    notes: this.notes.map((note) => new SMUFL.Note(note)),
    bars: this.bars.map((bar) => new SMUFL.Bar(bar)),
    staves: this.staves.map((stave) => new SMUFL.Stave(stave)),
  });
  if (process.env.NODE_ENV === "development") console.log({ smufl: score });
  return score;
};
