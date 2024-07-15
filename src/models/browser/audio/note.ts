import Core from "../../core";
import * as Audio from ".";
import Sample from "../../files/soundfont2/sample";

export class Note {
  core;
  track;
  constructor(core: InstanceType<typeof Core.Note>, track: Audio.Track) {
    this.core = core;
    this.track = track;
  }
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
