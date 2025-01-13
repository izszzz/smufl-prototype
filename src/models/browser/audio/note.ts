import * as Core from "core";
import * as Audio from ".";
import * as Soundfont2 from "soundfont2";

export class Note extends Core.Note {
  track!: Audio.Track;
  calcBaseDetune(sample: Soundfont2.Sample) {
    return (
      (Audio.calcKey(
        sample.generators.overridingRootKey,
        sample.header.data.originalKey
      ) +
        Audio.calcCorrection(sample.header.data) +
        Audio.calcTune(sample.generators)) *
      Audio.calcScale(sample.generators)
    );
  }
}
