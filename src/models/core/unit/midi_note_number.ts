import { ScientificPitchNotation } from "./scientific_pitch_notation";
import { PitchClass } from "./pitch_class";
import { Tonality } from "core";
import musicTheory from "../../../const/music-theory.json";

export class MidiNoteNumber {
  _brandMidiNoteNumber!: never;
  constructor(public value: number) {}
  toPitchClass() {
    return new PitchClass(this.value % musicTheory.pitchClasses.length);
  }
  toScientificPitchNotation(tonality: Tonality) {
    return new ScientificPitchNotation(
      `${this.toPitchClass().toPitchClassName(tonality).value}${
        Math.trunc(this.value / musicTheory.pitchClasses.length) - 1
      }`
    );
  }
  static readonly MIDDLE_C = 60;
}
