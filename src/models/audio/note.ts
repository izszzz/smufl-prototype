import * as Core from "core";
import * as Audio from ".";

export class Note extends Core.Note {
  score!: Audio.Score;
  get tempo() {
    return this.score.tempos.find((tempo) => tempo.isOverlapped(this))!;
  }
}
