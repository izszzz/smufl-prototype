import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Note extends Sheet.Note {
  declare score: SMUFL.Score;
  override get stave() {
    return super.stave as SMUFL.Stave;
  }
}
