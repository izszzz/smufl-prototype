import * as Audio from ".";
import Core from "../../core";

export class Track {
  core;
  score;
  volume;
  preset;
  notes;
  constructor(
    core: InstanceType<typeof Core.Track>,
    score: InstanceType<typeof Audio.Score>
  ) {
    this.core = core;
    this.score = score;
    this.volume = score.audioContext.createGain();
    this.volume.gain.value = 1 / 100000;
    this.preset = score.soundfont2.getPreset(core.preset);
    this.notes = core.notes.map((note) => new Audio.Note(note, this));
  }
  createSynths() {
    return this.preset.instruments
      .flatMap((instrument) => instrument.samples)
      .map((sample) => {
        const buffer = this.score.audioContext.createBuffer(
          1,
          sample.data.length,
          sample.header.data.sampleRate
        );
        buffer.getChannelData(0).set(sample.data);
        return new Audio.Synth(
          this.score.audioContext,
          buffer,
          sample,
          {
            envelope: {
              delay: sample.generators.delayVolEnv,
              attack:
                sample.generators.delayVolEnv + sample.generators.attackVolEnv,
              hold:
                sample.generators.delayVolEnv +
                sample.generators.attackVolEnv +
                sample.generators.holdVolEnv,
              sustain: Math.pow(10, sample.generators.sustainVolEnv / 20),
              decay:
                sample.generators.delayVolEnv +
                sample.generators.attackVolEnv +
                sample.generators.holdVolEnv +
                sample.generators.decayVolEnv,
              release: sample.generators.releaseVolEnv,
            },
          },
          {
            envelope: {
              delay: sample.generators.delayModEnv,
              attack:
                sample.generators.delayModEnv + sample.generators.attackModEnv,
              hold:
                sample.generators.delayModEnv +
                sample.generators.attackModEnv +
                sample.generators.holdModEnv,
              sustain:
                sample.generators.initialFilterFc +
                sample.generators.modEnvToFilterFc -
                sample.generators.sustainModEnv,
              decay:
                sample.generators.delayModEnv +
                sample.generators.attackModEnv +
                sample.generators.holdModEnv +
                sample.generators.decayModEnv,
              release: sample.generators.releaseModEnv,
            },
            Q: sample.generators.initialFilterQ,
            frequency: {
              min: sample.generators.initialFilterFc,
              max: sample.generators.modEnvToFilterFc,
            },
          },
          sample.generators.pan,
          this
        );
      });
  }
}
