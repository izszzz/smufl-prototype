import * as Core from "core";
import * as Sheet from "sheet";

export class Track extends Core.Track {
  staffLines;
  declare score: Sheet.Score;
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
  constructor({
    staffLines,
    ...track
  }: {
    staffLines: number;
  } & ConstructorParameters<typeof Core.Track>[0]) {
    super(track);
    this.staffLines = staffLines;
  }

  getMasterbarBars(masterbarId: number) {
    return this.score.bars.filter(
      (bar) => bar.trackId === this.id && bar.masterbarId === masterbarId
    );
  }
}
