import * as Audio from "..";
import * as Core from "core";
import * as Soundfont2 from "soundfont2";

declare module "core" {
  interface Score {
    toAudio: (
      soundfont2: Soundfont2.Sf2,
      audioContext: AudioContext
    ) => Audio.Score;
  }
}
// TODO: chord rest part
Core.Score.prototype.toAudio = function (
  this: Core.Score,
  sf2: Soundfont2.Sf2,
  audioContext: AudioContext
) {
  const score = new Audio.Score({
    ...this,
    tracks: this.tracks.map(
      (track) =>
        new Audio.Track({
          ...track,
          notes: track.notes.map((note) => new Audio.Note(note)),
          soundfont2: sf2,
          audioContext,
        })
    ),
  });
  for (const track of score.tracks)
    for (const note of track.notes) note.track = track;
  return score;
};
