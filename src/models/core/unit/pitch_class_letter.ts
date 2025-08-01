export class PitchClassLetter {
  _brandNoteLetter!: never;
  constructor(
    public value: `${(typeof PitchClassLetter.STEPS)[number]}${(typeof PitchClassLetter.ACCIDENTALS)[number]}`
  ) {}
  static readonly STEPS = [
    "C",
    null,
    "D",
    null,
    "E",
    "F",
    null,
    "G",
    null,
    "A",
    null,
    "B",
  ];
  static readonly ACCIDENTALS = ["#", "b", ""];
}
