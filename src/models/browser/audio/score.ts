import * as Audio from ".";
import * as Core from "../../core";
import Soundfont2 from "../../files/soundfont2";
export class Score {
  core;
  soundfont2;
  tracks;
  audioContext;
  constructor(
    core: Core.Score,
    soundfont2: Soundfont2,
    audioContext: AudioContext
  ) {
    this.core = core;
    this.soundfont2 = soundfont2;
    this.audioContext = audioContext;
    this.tracks = core.tracks.map((track) => new Audio.Track(track, this));
  }
}
