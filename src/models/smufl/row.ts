import * as R from "remeda";
import * as SMUFL from "./";

interface IRow {
  tracks: SMUFL.Track[];
  masterBars: SMUFL.MasterBar[];
}
export class Row extends SMUFL.Rect implements IRow {
  tracks;
  masterBars;
  constructor({ masterBars, tracks }: IRow) {
    super();
    this.masterBars = masterBars;
    this.tracks = tracks;
    for (const bar of R.first(this.masterBars)?.bars ?? [])
      bar.metadata = new SMUFL.Metadata(bar.core.getMetadata());
    for (const bar of R.last(this.masterBars)?.bars ?? [])
      bar.barline.end = new SMUFL.Glyph({
        glyphName: bar.core.next ? "barlineSingle" : "barlineFinal",
      });
    this.width = R.pipe(
      this.masterBars,
      R.map((masterBar) => masterBar.width),
      R.reduce(R.add, 0)
    );
  }
}
