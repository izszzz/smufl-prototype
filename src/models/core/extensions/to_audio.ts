import * as Audio from "../../browser/audio";
import * as Core from "core";
import "../../../extensions/int16array/to_float32array.extensions";

declare module "core" {
  interface Score {
    toAudio: (audioContext: AudioContext) => Audio.Score;
  }
}

Core.Score.prototype.toAudio = function (
  this: Core.Score,
  audioContext: AudioContext
) {
  const score = new Audio.Score({
    ...this,
    tracks: this.tracks.map(
      (track) =>
        new Audio.Track({
          ...track,
          notes: track.notes.map((note) => new Audio.Note(note)),
          audioContext,
        })
    ),
  });
  for (const track of score.tracks) {
    track.score = score;
    for (const note of track.notes) note.track = track;
  }
  return score;
};
