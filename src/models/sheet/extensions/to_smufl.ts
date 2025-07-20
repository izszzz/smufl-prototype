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
  });

  if (process.env.NODE_ENV === "development") console.log({ smufl: score });
  return score;
};
