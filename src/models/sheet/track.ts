import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Track extends Core.Track {
  staffLines;
  declare score: Sheet.Score;
  get staff() {
    return SMUFL.Glyph.find("staves", (v) =>
      v.includes(this.staffLines.toString())
    );
  }
  get bars() {
    return this.score.bars.filter((bar) => bar.trackId === this.id);
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
}
