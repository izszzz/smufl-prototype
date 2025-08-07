import { ScientificPitchNotation } from "./scientific_pitch_notation";
import Metadata from "../metadata.json";
import { PitchClass } from "./pitch_class";
import { IntRange } from "type-fest";
import { Tonality } from "core";
export class MidiNoteNumber {
  _brandMidiNoteNumber!: never;
  constructor(public value: number) {}
  static readonly MIDDLE_C = 60;
  toPitchClass() {
    return new PitchClass(
      (this.value % Metadata.pitchClasses.length) as IntRange<0, 11>
    );
  }
  toScientificPitchNotation(tonality: Tonality) {
    return new ScientificPitchNotation(
      `${this.toPitchClass().toLetter(tonality).value}${
        Math.trunc(this.value / Metadata.pitchClasses.length) - 1
      }`
    );
  }
}
