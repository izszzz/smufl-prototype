import * as Audio from "../../audio";
import * as Core from "core";
import "../../../extensions/int16array/to_float32array.extensions";

declare module "core" {
  interface Score {
    toAudio(): Audio.Score;
  }
}

Core.Score.prototype.toAudio = function (this: Core.Score) {
  return Audio.Score.create({
    ...this.params,
    tracks: this.tracks.map((track) => ({
      ...track.params,
      notes: track.notes.map(({ params }) => params),
    })),
    keysignatures: this.keysignatures.map(({ params }) => params),
  });
};
