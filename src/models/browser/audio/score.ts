import * as Audio from ".";
import * as Core from "../../core";
export class Score extends Core.Score<Audio.Note, Audio.Track> {
  constructor(core: Core.Score<Audio.Note, Audio.Track>) {
    super(core);
  }
}
