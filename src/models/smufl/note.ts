import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Note<
  Pitch extends Sheet.Pitch = Sheet.Pitch,
> extends Sheet.Note<Pitch> {
  declare score: SMUFL.Score;
  override get stave() {
    return super.stave as SMUFL.Stave;
  }
}
