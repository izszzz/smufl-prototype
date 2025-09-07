import * as Audio from "../../audio";
import * as BrowserAudio from ".";

export class Controller extends Audio.Controller {
  audioContext;
  score;
  isPlaying = false;
  constructor(score: BrowserAudio.Score, audioContext: AudioContext) {
    super();
    this.audioContext = audioContext;
    this.score = score;
  }
  play() {
    const startTime = this.audioContext.currentTime;
    for (const note of this.score.notes) {
      console.log(
        startTime,
        note.start.toSeconds(note.tempo.value),
        note.end.toSeconds(note.tempo.value)
      );
      note.synth.noteOn(startTime + note.start.toSeconds(note.tempo.value));
      note.synth.noteOff(startTime + note.end.toSeconds(note.tempo.value));
    }
  }
  pause() {}
  stop() {}
}
