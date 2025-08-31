import * as Core from "core";
import * as Sheet from "sheet";

export class Track extends Core.Track {
  declare score: Sheet.Score;
  get notes() {
    return super.notes as Sheet.Note[];
  }
  get bars() {
    return this.score.bars.filter((bar) => bar.trackId === this.id);
  }
  get height() {
    return this.bars.reduce((acc, cur) => acc + cur.height, 0);
  }
  get y(): number {
    return ((this.prev?.height ?? 0) + 6.5) * this.id;
  }
  get prev() {
    return this.score.tracks[this.id - 1];
  }
  getMasterbarBars(masterbarId: number) {
    return this.score.bars.filter(
      (bar) => bar.trackId === this.id && bar.id === masterbarId
    );
  }
}
