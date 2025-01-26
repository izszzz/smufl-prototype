import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Track extends Core.Track<Sheet.Note> {
  bars: Sheet.Bar[] = [];
  staffLines;
  get staff() {
    return SMUFL.Glyph.find("staves", (v) =>
      v.includes(this.staffLines.toString())
    );
  }
  constructor({
    bars,
    staffLines,
    ...track
  }: {
    bars: Sheet.Bar[];
    staffLines: number;
  } & Core.Track<Sheet.Note>) {
    super(track);
    this.bars = bars;
    this.staffLines = staffLines;
  }
}
