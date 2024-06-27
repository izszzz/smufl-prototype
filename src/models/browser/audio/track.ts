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
    this.gain.connect(score.audioContext.destination);
    this.gain.gain.value = 0.01 / 10000;
    this.preset = score.soundfont2.getPreset(0);
    this.buffers = this.preset.instruments
      .flatMap((instrument) => instrument.samples)
      .map((sample) => {
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
          (sample.generators.overridingRootKey === -1
            ? sample.header.data.originalKey
            : sample.generators.overridingRootKey) -
          sample.header.data.correction / 100.0 -
          sample.generators.fineTune;
        const playbackRate =
          1.0 * Math.pow(2, (100.0 * (60 - baseDetune)) / 1200.0);
        bufferSource.buffer = buffer;
        console.log(sample.generators.sampleModes);
        console.log(sample.generators.sampleModes !== 0);
        if (sample.generators.sampleModes !== 0) {
          bufferSource.loop = true;
          bufferSource.loopStart =
            (sample.startLoop - sample.start) / sample.header.data.sampleRate;
          bufferSource.loopEnd =
            (sample.endLoop - sample.end) / sample.header.data.sampleRate;
        }
        bufferSource.playbackRate.value = playbackRate;
        bufferSource.connect(this.gain);
        bufferSource.start();
      });
    this.notes = core.notes.map((note) => new Audio.Note(note));
  }
}
