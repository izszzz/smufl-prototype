import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Bar extends Sheet.Bar {
  declare score: SMUFL.Score;
  override get staves() {
    return super.staves as SMUFL.Stave[];
  }
}
