import { MidiNoteNumber } from "./midi_note_number";
import { PitchClassLetter } from "./pitch_class_letter";

export class ScientificPitchNotation {
  _brandScientificPitchNotation!: never;
  get octave() {
    return parseInt(this.value.slice(-1), 10);
  }
  get pitchClassLetter() {
    return new PitchClassLetter(
      this.value.slice(0, -1) as PitchClassLetter["value"]
    );
  }
  constructor(
    public value: `${PitchClassLetter["value"]}${(typeof ScientificPitchNotation.OCTAVE)[number]}`
  ) {}
  static readonly MIDDLE_C = "C4";
  static readonly OCTAVE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  getDegree(scientificPitchNotation: ScientificPitchNotation) {
    return (
      this.pitchClassLetter.getDegree(
        scientificPitchNotation.pitchClassLetter
      ) +
      (this.octave - scientificPitchNotation.octave) *
        PitchClassLetter.NOTES.length
    );
  }
  toMidiNoteNumber() {
    return new MidiNoteNumber(
      (this.octave + 1) * 12 + this.pitchClassLetter.toPitchClass().value
    );
  }
}
