import musicTheory from "../../../const/music-theory.json";
import { MidiNoteNumber } from "./midi_note_number";
import { PitchClassName } from "./pitch_class_name";

export class ScientificPitchNotation {
  value: `${PitchClassName["value"]}${number}`;
  _brandScientificPitchNotation!: never;
  get octave() {
    return Number(this.value.slice(-1));
  }
  get pitchClassName() {
    return new PitchClassName(this.value.slice(0, -1));
  }
  constructor(value: string) {
    this.value = this.validate(value);
  }
  getDegree(scientificPitchNotation: ScientificPitchNotation) {
    return (
      this.pitchClassName.getDegree(scientificPitchNotation.pitchClassName) +
      (this.octave - scientificPitchNotation.octave) *
        musicTheory.diatonicScale.length
    );
  }
  toMidiNoteNumber() {
    return new MidiNoteNumber(
      (this.octave + 1) * 12 + this.pitchClassName.toPitchClass().value
    );
  }
  static readonly MIDDLE_C = "C4";
  private validate(value: string) {
    const pitchClassName = value.slice(0, -1);
    if (!PitchClassName.isPitchClassName(pitchClassName)) throw Error();
    return `${pitchClassName}${Number(value.slice(-1))}` as const;
  }
}
