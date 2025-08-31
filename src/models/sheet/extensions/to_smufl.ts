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
      notes: track.notes.map((note) => note.params),
    })),
    keysignatures: this.keysignatures.map(
      (keysignature) => keysignature.params
    ),
    timesignatures: this.timesignatures.map(
      (timesignature) => timesignature.params
    ),
    tempos: this.tempos.map((tempo) => tempo.params),
  });
};
