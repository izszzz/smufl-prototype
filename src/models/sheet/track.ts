import * as Core from "core";
import * as Sheet from "sheet";

export class Track extends Core.Track<Sheet.Note> {
  bars: Sheet.Bar[] = [];
  constructor({
    bars,
    ...track
  }: { bars: Sheet.Bar[] } & Core.Track<Sheet.Note>) {
    super(track);
    this.bars = bars;
  }
}
