import * as Audio from ".";
import Core from "../../core";

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
    const noteDuration = 3;
    // this.preset = score.soundfont2.getPreset(core.preset);
    this.preset = score.soundfont2.getPreset(0);
    this.buffers = this.preset.instruments
      .flatMap((instrument) => instrument.samples)
      .map((sample) => {
        let now = score.audioContext.currentTime;
        // buffer
        const float32 = sample.data;
        const buffer = score.audioContext.createBuffer(
          1,
          sample.data.length,
          sample.header.data.sampleRate
        );
        buffer.getChannelData(0).set(float32);

        // buffer source
        const bufferSource = score.audioContext.createBufferSource();
        const baseDetune =
          (sample.generators.overridingRootKey === -1 //-1 is overridingRootKey default value
            ? sample.header.data.originalKey
            : sample.generators.overridingRootKey) -
          sample.header.data.correction / 100.0 -
          sample.generators.coarseTune -
          sample.generators.fineTune;
        const playbackRate =
          1.0 * Math.pow(2, (100.0 * (60 - baseDetune)) / 1200.0);
        bufferSource.buffer = buffer;
        bufferSource.playbackRate.value = playbackRate;
        if (sample.generators.sampleModes !== 0) {
          bufferSource.loop = true;
          bufferSource.loopStart =
            (sample.startLoop - sample.start) / sample.header.data.sampleRate;
          bufferSource.loopEnd =
            (sample.endLoop - sample.end) / sample.header.data.sampleRate;
        }

        // envelope
        const gain = score.audioContext.createGain();
        // init
        gain.gain.setValueAtTime(0, now);

        // delay
        gain.gain.linearRampToValueAtTime(
          0,
          (now += sample.generators.delayVolEnv)
        );

        // attack
        gain.gain.linearRampToValueAtTime(
          1,
          (now += sample.generators.attackVolEnv)
        );

        // hold
        gain.gain.linearRampToValueAtTime(
          1,
          (now += sample.generators.holdVolEnv)
        );

        //decay
        gain.gain.linearRampToValueAtTime(
          1 - sample.generators.sustainVolEnv,
          (now += sample.generators.decayVolEnv + noteDuration)
        );
        console.log(now);

        // release
        gain.gain.linearRampToValueAtTime(
          0,
          (now += sample.generators.releaseVolEnv)
        );

        //filter
        const filter = score.audioContext.createBiquadFilter();
        filter.type = "lowpass";
        // init
        filter.frequency.setValueAtTime(sample.generators.initialFilterFc, 0);
        filter.Q.setValueAtTime(sample.generators.initialFilterQ, 0);

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

        // lfo.start();
        bufferSource.start();
      });
    this.notes = core.notes.map((note) => new Audio.Note(note));
  }
}
