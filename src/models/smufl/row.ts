import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Row<
  Masterbar extends SMUFL.Masterbar = SMUFL.Masterbar,
> extends Sheet.Row<Masterbar> {}
