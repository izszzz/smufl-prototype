import * as Core from "core";
import * as Audio from "../audio";

export class Track extends Core.Track {
  volume;
  audioContext;
  override get notes() {
    return super.notes as Audio.Note[];
  }
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
