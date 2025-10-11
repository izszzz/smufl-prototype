import * as Core from "core";
import * as Sheet from "sheet";
import { StaffDetails } from "src/const/musicxml/4.0/musicxml";

export class Track extends Core.Track {
  staffDetails;
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
    return this.prev ? this.prev.y + this.height + 6.5 : 0;
  }
  get prev() {
    return this.score.tracks[this.id - 1];
  }
  get params() {
    return { ...super.params, staffDetails: this.staffDetails };
  }
  constructor({
    staffDetails,
    ...track
  }: { staffDetails: StaffDetails } & ConstructorParameters<
    typeof Core.Track
  >[0]) {
    super(track);
    this.staffDetails = staffDetails;
  }
  getMasterbarBars(masterbarId: number) {
    return this.score.bars.filter(
      (bar) => bar.trackId === this.id && bar.id === masterbarId
    );
  }
}
