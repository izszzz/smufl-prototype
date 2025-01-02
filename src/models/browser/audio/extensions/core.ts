import * as Audio from "..";
import * as Core from "../../../core";
import Soundfont2 from "../../../files/soundfont2";

declare module "../../../core" {
  interface Score {
    toAudio: (
      soundfont2: Soundfont2,
      audioContext: AudioContext
    ) => Audio.Score;
  }
}
// TODO: chord rest part
Core.Score.prototype.toAudio = function (
  this: Core.Score,
  soundfont2: Soundfont2,
  audioContext: AudioContext
) {
  const score = new Audio.Score({
    ...this,
    tracks: this.tracks.map(
      (track) =>
        new Audio.Track({
          ...track,
          notes: track.notes.map((note) => new Audio.Note(note)),
          soundfont2,
          audioContext,
        })
    ),
  });
  for (const track of score.tracks)
    for (const note of track.notes) note.track = track;
  return score;
};
