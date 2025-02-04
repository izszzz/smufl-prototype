import * as Audio from ".";
import * as Core from "core";
import * as Soundfont2 from "soundfont2";
import "../../core/extensions/to_audio";

export class Player {
  ctx;
  core;
  score;
  volume;
  sf2;
  isPlaying = false;
  constructor(core: Core.Score, sf2: Soundfont2.Sf2) {
    this.core = core;
    this.ctx = new AudioContext();
    this.volume = this.ctx.createGain();
    this.sf2 = sf2;
    this.score = core.toAudio(this.ctx);
    this.volume.connect(this.ctx.destination);
  }
  play() {
    this.isPlaying = true;
    for (const track of this.score.tracks) {
      const soundfont2Preset = this.sf2.getPreset(track.preset);
      track.volume.connect(this.volume);

      for (const note of track.notes) {
        console.log(note);
        if ("rest" in note && note.rest === true) continue;
        const sample = soundfont2Preset.instruments
          .flatMap((instrument) => instrument.samples)
          .find(
            (sample) =>
              sample.generators.keyRange.lo <= note.pitch.value &&
              sample.generators.keyRange.hi >= note.pitch.value
          )!;

        console.log(sample);

        // create buffer
        const float32 = sample.data.toFloat32Array();
        const buffer = track.audioContext.createBuffer(
          1,
          float32.length,
          sample.header.data.sampleRate.value
        );
        buffer.getChannelData(0).set(float32);

        // create buffersource
        const bufferSource = this.ctx.createBufferSource();
        bufferSource.buffer = buffer;
        if (sample.generators.sampleModes.value !== 0) {
          bufferSource.loop = true;
          bufferSource.loopStart =
            (sample.startLoop - sample.start) /
            sample.header.data.sampleRate.value;
          bufferSource.loopEnd =
            (sample.endLoop - sample.end) / sample.header.data.sampleRate.value;
        }
        bufferSource.playbackRate.value = sample.playBackRate(note.pitch.value);

        const synth = new Audio.Synth(
          track.audioContext,
          {
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
          {
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
          sample.generators.pan.toNumber()
        );

        synth.noteOn(
          this.ctx.currentTime + Core.convertTimeToSeconds(note.start, 120),
          bufferSource
        );
        synth.noteOff(
          this.ctx.currentTime + Core.convertTimeToSeconds(note.end, 120),
          bufferSource
        );
        // bufferSource.connect(synth.filter);
        bufferSource.connect(synth.gain);
        synth.gain.connect(track.volume);
      }
    }
  }
  pause() {}
  stop() {}
}
