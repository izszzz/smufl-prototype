import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Row extends Sheet.Row {
  declare score: SMUFL.Score;
  get masterbars() {
    return this.score.masterbars.filter(
      (masterbar) => masterbar.rowId === this.id
    );
  }
}
