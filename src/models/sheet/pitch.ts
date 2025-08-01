import * as Core from "core";
import { Clef } from "src/const/musicxml/4.0/musicxml";

// PitchクラスはUnitから外してCoreに追加していいかも
// valueがどのような値かを指定するUnitを追加するべき
// MiddleC MidiPitch(60) この表記わからん(C4) ド cent Hzなどでも表記できるはず

export class Pitch extends Core.Pitch {
  getLine(clef: Clef) {
    const sign = clef.$$.sign?.[0]._;
    if (sign === "G") {
      return (
        ((this.octave - 4) * Core.Metadata.majorWhiteNotes.length +
          this.whiteKey -
          2) /
        2
      );
    }
    if (sign === "F") {
      return (
        ((this.octave - 4) * Core.Metadata.majorWhiteNotes.length +
          this.whiteKey -
          2 +
          12) /
        2
      );
    }
    return 0;
  }
}
