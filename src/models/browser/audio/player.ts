import * as Audio from ".";
import * as Core from "../../core";
import Soundfont2 from "../../files/soundfont2";

export class Player {
  ctx;
  core;
  score;
  volume;
  isPlaying = false;
  constructor(core: Core.Score, soundfont2: Soundfont2) {
    this.core = core;
    this.ctx = new AudioContext();
    this.volume = this.ctx.createGain();
    this.score = new Audio.Score(core, soundfont2, this.ctx);
    console.log({ audio: this.score });

    this.volume.connect(this.ctx.destination);
  }
  play() {
    this.isPlaying = true;
    for (const track of this.score.tracks) {
      track.volume.connect(this.volume);
      for (const note of track.notes) {
        for (const synth of note.track.createSynths()) {
          const bufferSource = synth.createBufferSource(synth.sample);
          bufferSource.playbackRate.setValueAtTime(
            Audio.calcPlaybackRate(
              note.core.pitch,
              note.calcBaseDetune(synth.sample)
            ),
            this.score.audioContext.currentTime
          );
          synth.noteOn(
            this.ctx.currentTime +
              Core.convertTimeToSeconds(note.core.start, 120),
            bufferSource
          );
          synth.noteOff(
            this.ctx.currentTime +
              Core.convertTimeToSeconds(note.core.end, 120),
            bufferSource
          );
          bufferSource.connect(synth.filter);
          synth.gain.connect(track.volume);
        }
      }
    }
  }
  pause() {}
  stop() {}
}
