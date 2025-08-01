import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Masterbar extends Sheet.Masterbar {
  declare score: SMUFL.Score;
  override get bars() {
    return super.bars as SMUFL.Bar[];
  }
}
