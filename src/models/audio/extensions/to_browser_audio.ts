import * as Audio from "..";
import Soundfont2 from "soundfont2";
import * as BrowserAudio from "../../browser/audio";
import "../../../extensions/int16array/to_float32array.extensions";

declare module ".." {
  interface Score {
    toBrowserAudio(
      audioContext: AudioContext,
      soundfont2: Soundfont2
    ): BrowserAudio.Score;
  }
}

Audio.Score.prototype.toBrowserAudio = function (
  this: Audio.Score,
  audioContext,
  soundfont2
) {
  const score = BrowserAudio.Score.create({
    gain: audioContext.createGain(),
    ...this.params,
    tracks: this.tracks.map((track) => {
      const preset = soundfont2.getPreset(track.preset.value);
      return {
        gain: audioContext.createGain(),
        ...track.params,
        notes: track.notes
          .filter((note) => note.pitch.value !== -1)
          .map((note) => {
            const sample = preset.instruments
              .flatMap((instrument) => instrument.samples)
              .find(
                (sample) =>
                  sample.generators.keyRange.lo <= note.pitch.value &&
                  sample.generators.keyRange.hi >= note.pitch.value
              )!;
            return {
              ...note.params,
              synth: {
                pitch: note.pitch,
                preset,
                audioContext,
                volume: {
                  envelope: {
                    delay: sample.generators.delayVolEnv.toSeconds().value,
                    attack:
                      sample.generators.delayVolEnv.toSeconds().value +
                      sample.generators.attackVolEnv.toSeconds().value,
                    hold:
                      sample.generators.delayVolEnv.toSeconds().value +
                      sample.generators.attackVolEnv.toSeconds().value +
                      sample.generators.holdVolEnv.toSeconds().value,
                    sustain: sample.generators.sustainVolEnv.value,
                    decay:
                      sample.generators.delayVolEnv.toSeconds().value +
                      sample.generators.attackVolEnv.toSeconds().value +
                      sample.generators.holdVolEnv.toSeconds().value +
                      sample.generators.decayVolEnv.toSeconds().value,
                    release: sample.generators.releaseVolEnv.toSeconds().value,
                  },
                },
                modulator: {
                  envelope: {
                    delay: sample.generators.delayModEnv.toSeconds().value,
                    attack:
                      sample.generators.delayModEnv.toSeconds().value +
                      sample.generators.attackModEnv.toSeconds().value,
                    hold:
                      sample.generators.delayModEnv.toSeconds().value +
                      sample.generators.attackModEnv.toSeconds().value +
                      sample.generators.holdModEnv.toSeconds().value,
                    sustain: -sample.generators.sustainModEnv.toNumber(),
                    decay:
                      sample.generators.delayModEnv.toSeconds().value +
                      sample.generators.attackModEnv.toSeconds().value +
                      sample.generators.holdModEnv.toSeconds().value +
                      sample.generators.decayModEnv.toSeconds().value,
                    release: sample.generators.releaseModEnv.toSeconds().value,
                  },
                  Q: sample.generators.initialFilterQ.toDecibel().value,
                  frequency: {
                    min: sample.generators.initialFilterFc.toHertz().value,
                    max: sample.generators.modEnvToFilterFc.value,
                  },
                },
                pan: sample.generators.pan.toNumber(),
              },
            };
          }),
      };
    }),
  });

  score.gain.connect(audioContext.destination);
  for (const track of score.tracks) {
    track.gain.connect(score.gain);
    for (const note of track.notes) note.synth.gain.connect(track.gain);
  }
  console.log({ browserAudio: score });
  return score;
};
