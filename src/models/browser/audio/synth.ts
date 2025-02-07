import Envelope, { IEnvelope } from "./envelope";
export class Synth {
  filter;
  gain;
  panner;
  private filterEnvelope;
  private gainEnvelope;
  constructor(
    audioContext: AudioContext,

    volume: { envelope: Omit<IEnvelope<number, number>, "init"> },
    modulator: {
      envelope: Omit<IEnvelope<number, number>, "init">;
      Q: number;
      frequency: {
        min: number;
        max: number;
      };
    },
    pan: number
  ) {
    this.gain = audioContext.createGain();
    this.panner = audioContext.createStereoPanner();
    this.filter = audioContext.createBiquadFilter();

    this.filter.type = "lowpass";
    this.filter.Q.setValueAtTime(modulator.Q, 0);
    this.panner.pan.setValueAtTime(pan, 0);

    this.gainEnvelope = new Synth.Envelope(this.gain.gain, {
      init: { value: 0, time: 0 },
      delay: { value: 0, time: volume.envelope.delay },
      attack: { value: 1, time: volume.envelope.attack },
      hold: { value: 1, time: volume.envelope.hold },
      decay: volume.envelope.decay,
      sustain: volume.envelope.sustain,
      release: { value: 0, time: volume.envelope.release },
    });
    this.filterEnvelope = new Synth.Envelope(this.filter.frequency, {
      init: { value: modulator.frequency.min, time: 0 },
      delay: {
        value: modulator.frequency.min,
        time: modulator.envelope.delay,
      },
      attack: {
        value: modulator.frequency.min + modulator.frequency.max,
        time: modulator.envelope.attack,
      },
      hold: {
        value: modulator.frequency.min + modulator.frequency.max,
        time: modulator.envelope.hold,
      },
      decay: modulator.envelope.decay,
      sustain: modulator.envelope.sustain,
      release: {
        value: modulator.frequency.min,
        time: modulator.envelope.release,
      },
    });
    // this.filter.connect(this.panner).connect(this.gain);
    // this.panner.connect(this.gain);
  }
  noteOn(time: number, bufferSource: AudioBufferSourceNode) {
    bufferSource.start(time);
    this.gainEnvelope.noteOn(time);
    this.filterEnvelope.noteOn(time);
  }
  noteOff(time: number, bufferSource: AudioBufferSourceNode) {
    bufferSource.stop(
      // Math.max(
      //   this.filterEnvelope.release.time,
      //   this.gainEnvelope.release.time
      // ) +
      time
    );
    this.gainEnvelope.noteOff(time);
    this.filterEnvelope.noteOff(time);
  }

  static Envelope = Envelope;
}
