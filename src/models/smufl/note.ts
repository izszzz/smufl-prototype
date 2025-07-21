import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Note extends Sheet.Note {
  declare score: SMUFL.Score;
  get stave() {
    return this.score.staves.find((stave) => stave.id === this.staveId)!;
  }
}
