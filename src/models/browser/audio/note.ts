import * as Core from "../../core";
import * as Audio from ".";
import Sample from "../../files/soundfont2/sample";

export class Note extends Core.Note {
  track!: Audio.Track;
  calcBaseDetune(sample: Sample) {
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
