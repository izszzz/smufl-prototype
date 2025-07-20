import * as Core from "core";

export class Track extends Core.Track {
  volume;
  audioContext;
  constructor({
    audioContext,
    ...core
  }: {
    audioContext: AudioContext;
  } & ConstructorParameters<typeof Core.Track>[0]) {
    super(core);
    this.volume = audioContext.createGain();
    this.audioContext = audioContext;
  }
}
