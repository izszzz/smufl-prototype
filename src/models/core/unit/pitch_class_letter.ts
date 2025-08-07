import { PitchClass } from "./pitch_class";
import { match } from "ts-pattern";
import { IntRange } from "type-fest";

export class PitchClassLetter {
  _brandNoteLetter!: never;
  constructor(
    public value: `${(typeof PitchClassLetter.NOTES)[number]}${(typeof PitchClassLetter.ACCIDENTALS)[number]}`
  ) {}
  get accidental() {
    return (this.value.at(-1) ??
      "") as (typeof PitchClassLetter.ACCIDENTALS)[number];
  }
  get note() {
    return this.value.at(-1) as (typeof PitchClassLetter.NOTES)[number];
  }
  get noteIndex() {
    return PitchClassLetter.NOTES.indexOf(this.note);
  }
  toPitchClass() {
    return new PitchClass(
      (PitchClassLetter.STEPS.indexOf(this.note) +
        match(this.accidental)
          .with("#", () => 1)
          .with("b", () => -1)
          .with("", () => 0)
          .exhaustive()) as IntRange<0, 11>
    );
  }
  static readonly NOTES = ["C", "D", "E", "F", "G", "A", "B"] as const;
  static readonly STEPS = [
    this.NOTES[0],
    null,
    this.NOTES[1],
    null,
    this.NOTES[2],
    this.NOTES[3],
    null,
    this.NOTES[4],
    null,
    this.NOTES[5],
    null,
    this.NOTES[6],
  ];
  static readonly ACCIDENTALS = ["#", "b", ""] as const;
}
