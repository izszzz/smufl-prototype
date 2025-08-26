import * as Audio from ".";
import * as Core from "core";
export class Score extends Core.Score<Audio.Note, Audio.Track> {
  constructor(
    params: ConstructorParameters<typeof Core.Score<Audio.Note, Audio.Track>>[0]
  ) {
    super(params);
    for (const note of this.notes) note.score = this;
  }
}
