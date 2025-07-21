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
    staves: this.staves.map(
      (stave) => new SMUFL.Stave({ ...stave, clef: stave._clef })
    ),
    bars: this.bars.map((bar) => new SMUFL.Bar(bar)),
    masterbars: this.masterbars.map(
      (masterbar) => new SMUFL.Masterbar(masterbar)
    ),
    notes: this.notes.map((note) => new SMUFL.Note(note)),
    rows: this.rows.map((row) => new SMUFL.Row(row)),
  });

  if (process.env.NODE_ENV === "development") console.log({ smufl: score });
  return score;
};
