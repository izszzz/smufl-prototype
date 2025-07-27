import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Track extends Sheet.Track {
  declare score: SMUFL.Score;
  override get bars() {
    return super.bars as SMUFL.Bar[];
  }
  get staff() {
    return SMUFL.Glyph.find("staves", (v) =>
      v.includes(this.staffLines.toString())
    );
  }
  override getMasterbarBars(masterbarId: number) {
    return super.getMasterbarBars(masterbarId) as SMUFL.Bar[];
  }
}
