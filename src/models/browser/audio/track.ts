import * as Audio from ".";
import Core from "../../core";
import "../../../extensions/int16array/to_float32array.extensions";

export class Track {
  core;
  gain;
  preset;
  notes;
  buffers;
  constructor(
    core: InstanceType<typeof Core.Track>,
    score: InstanceType<typeof Audio.Score>
  ) {
    this.core = core;
    this.gain = score.audioContext.createGain();
    this.gain.gain.value = 1 / 1000000;
    // TODO: 3はNoteOnの長さ
    const noteDuration = 1.11;
    // this.preset = score.soundfont2.getPreset(core.preset);
    this.preset = score.soundfont2.getPreset(0);
    this.buffers = this.preset.instruments
      .flatMap((instrument) => instrument.samples)
      .map((sample) => {
        let now = score.audioContext.currentTime;
        // buffer
        const buffer = score.audioContext.createBuffer(
          1,
          sample.data.length,
          sample.header.data.sampleRate
        );
        buffer.getChannelData(0).set(sample.data);

        // buffer source
        const bufferSource = score.audioContext.createBufferSource();
        const baseDetune =
          (Audio.calcKey(
            sample.generators.overridingRootKey,
            sample.header.data.originalKey
          ) +
            Audio.calcCorrection(sample.header.data) +
            Audio.calcTune(sample.generators)) *
          Audio.calcScale(sample.generators);
        const playbackRate = Audio.calcPlaybackRate(60, baseDetune);
        bufferSource.buffer = buffer;
        if (sample.generators.sampleModes !== 0) {
          bufferSource.loop = true;
          bufferSource.loopStart =
            (sample.startLoop - sample.start) / sample.header.data.sampleRate;
          bufferSource.loopEnd =
            (sample.endLoop - sample.end) / sample.header.data.sampleRate;
        }
        bufferSource.playbackRate.setValueAtTime(playbackRate, now);

        // envelope
        // init
        const gain = score.audioContext.createGain();
        gain.gain.setValueAtTime(0, now);

        // delay
        gain.gain.setValueAtTime(0, (now += sample.generators.delayVolEnv));

        // attack
        gain.gain.linearRampToValueAtTime(
          1,
          (now += sample.generators.attackVolEnv)
        );

        // hold
        gain.gain.setValueAtTime(1, (now += sample.generators.holdVolEnv));

        console.log(
          Math.max(0.5 * (1 - sample.generators.sustainVolEnv), 0.001)
        );
        //decay
        gain.gain.exponentialRampToValueAtTime(
          Math.max(0.5 * (1 - sample.generators.sustainVolEnv), 0.001),
          (now += sample.generators.decayVolEnv)
        );

        // release
        // gain.gain.exponentialRampToValueAtTime(
        //   0.001,
        //   (now += sample.generators.releaseVolEnv)
        // );

        //filter
        let filterNow = score.audioContext.currentTime;
        const filter = score.audioContext.createBiquadFilter();
        filter.type = "lowpass";
        // init
        filter.Q.setValueAtTime(sample.generators.initialFilterQ, filterNow);
        filter.frequency.setValueAtTime(
          sample.generators.initialFilterFc,
          filterNow
        );

        // delay;
        filter.frequency.linearRampToValueAtTime(
          sample.generators.initialFilterFc,
          (filterNow += sample.generators.delayModEnv)
        );

        // attack;
        filter.frequency.linearRampToValueAtTime(
          sample.generators.initialFilterFc +
            sample.generators.modEnvToFilterFc,
          (filterNow += sample.generators.attackModEnv)
        );

        // hold
        filter.frequency.linearRampToValueAtTime(
          sample.generators.initialFilterFc +
            sample.generators.modEnvToFilterFc,
          (filterNow += sample.generators.holdModEnv)
        );

        // decay
        filter.frequency.linearRampToValueAtTime(
          sample.generators.initialFilterFc +
            sample.generators.modEnvToFilterFc -
            (sample.generators.initialFilterFc +
              sample.generators.modEnvToFilterFc) *
              (1 - sample.generators.sustainModEnv),
          (filterNow += sample.generators.decayModEnv + noteDuration)
        );

        // release
        filter.frequency.linearRampToValueAtTime(
          sample.generators.initialFilterFc,
          (filterNow += sample.generators.releaseModEnv)
        );

        // panner
        const panner = score.audioContext.createStereoPanner();
        panner.pan.setValueAtTime(sample.generators.pan / 1000, 0);

        // lfo
        // const lfo = score.audioContext.createOscillator();
        // const lfoGain = score.audioContext.createGain();
        // lfoGain.gain.value = 0.01 / 10000;
        // lfo.frequency.setValueAtTime(sample.generators.vibLfoToPitch, 0);
        // lfoGain.gain.setValueAtTime(sample.generators.modLfoToPitch, 0);
        // lfo.connect(lfoGain);
        // lfoGain.connect(bufferSource.detune);

        bufferSource.connect(filter);
        filter.connect(panner);
        panner.connect(gain);
        gain.connect(this.gain);
        this.gain.connect(score.audioContext.destination);

        bufferSource.start();
      });
    this.notes = core.notes.map((note) => new Audio.Note(note));
  }
}
