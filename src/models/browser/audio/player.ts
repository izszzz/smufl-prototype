import * as Audio from ".";
import * as Core from "core";
import * as Soundfont2 from "soundfont2";

export class Player {
  ctx;
  core;
  score;
  volume;
  isPlaying = false;
  constructor(core: Core.Score, sf2: Soundfont2.Sf2) {
    this.core = core;
    this.ctx = new AudioContext();
    this.volume = this.ctx.createGain();
    this.score = core.toAudio(sf2, this.ctx);
    if (process.env.NODE_ENV === "development")
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
              note.pitch.value,
              note.calcBaseDetune(synth.sample)
            ),
            track.audioContext.currentTime
          );
          synth.noteOn(
            this.ctx.currentTime + Core.convertTimeToSeconds(note.start, 120),
            bufferSource
          );
          synth.noteOff(
            this.ctx.currentTime + Core.convertTimeToSeconds(note.end, 120),
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
