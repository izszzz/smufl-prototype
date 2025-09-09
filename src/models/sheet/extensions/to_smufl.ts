import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: () => SMUFL.Score;
  }
}

Sheet.Score.prototype.toSMUFL = function (this: Sheet.Score) {
  return SMUFL.Score.create({
    ...this.params,
    tracks: this.tracks.map((track) => ({
      ...track.params,
      notes: track.notes.map(({ params }) => params),
    })),
    keysignatures: this.keysignatures.map(({ params }) => params),
    timesignatures: this.timesignatures.map(({ params }) => params),
    tempos: this.tempos.map(({ params }) => params),
  });
};
