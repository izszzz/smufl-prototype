import * as Audio from ".";
import * as Core from "core";

export class Track extends Core.Track<Audio.Note> {
  score!: Audio.Score;
  volume;
  audioContext;
  constructor({
    audioContext,
    ...core
  }: {
    audioContext: AudioContext;
  } & Core.Track<Audio.Note>) {
    super(core);
    this.volume = audioContext.createGain();
    this.audioContext = audioContext;
  }
}
