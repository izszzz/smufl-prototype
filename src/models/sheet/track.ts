import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Track<
  Note extends Sheet.Note = Sheet.Note,
  Bar extends Sheet.Bar = Sheet.Bar,
> extends Core.Track<Note> {
  bars: Bar[] = [];
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
    bars: Bar[];
    staffLines: number;
  } & Core.Track<Note>) {
    super(track);
    this.bars = bars;
    this.staffLines = staffLines;
  }
}
