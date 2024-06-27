import { SourceExporter } from "./source_exporter";
import Core from "../../core";
import Soundfont2 from "../../files/soundfont2";
// TODO: https://web.dev/articles/webaudio-intro?hl=ja

export class AudioPlayer {
  ctx;
  score;
  soundfont2;
  volumeNode;
  sourcesCollection: ReturnType<SourceExporter["export"]> = [];
  constructor(score: InstanceType<typeof Core.Score>, soundfont2: Soundfont2) {
    this.ctx = new AudioContext();
    this.volumeNode = this.ctx.createGain();
    this.score = score;
    this.soundfont2 = soundfont2;
    this.connect();
  }
  play() {
    if (this.ctx.state === "suspended") return this.ctx.resume();
    this.sourcesCollection = new SourceExporter(
      this.score,
      this.soundfont2,
      this.ctx
    ).export();
    for (const { sounds, track } of this.sourcesCollection) {
      for (const source of sounds) {
        source.connect(this.volumeNode);
        source.start();
        source.stop(
          this.ctx.currentTime +
            Core.convertTimeToSeconds(track.end, track.getMetadata().bpm)
        );
      }
    }
  }
  pause() {
    this.ctx.suspend();
  }
  private connect() {
    this.volumeNode.connect(this.ctx.destination);
  }
}
