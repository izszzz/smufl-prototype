import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Bar extends Sheet.Bar {
  declare score: SMUFL.Score;
  get staves() {
    return this.score.staves.filter((stave) => stave.barId === this.id);
  }
}
