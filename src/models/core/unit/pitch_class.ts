import { Tonality } from "core";
import { IntRange } from "type-fest";
import { PitchClassLetter } from "./pitch_class_letter";
import { P, match } from "ts-pattern";

export class PitchClass {
  _brandPitchClass!: never;
  constructor(public value: IntRange<0, 11>) {}
  toLetter(tonality: Tonality) {
    return new PitchClassLetter(
      match(this.value)
        .with(P.union(...PitchClass.ACCIDENTAL_PITCHECLASSES), (pitchClass) =>
          tonality === Tonality.Major
            ? PitchClassLetter.STEPS[pitchClass + 1] ??
              "" + PitchClassLetter.ACCIDENTALS[0]
            : PitchClassLetter.STEPS[pitchClass - 1] ??
              "" + PitchClassLetter.ACCIDENTALS[1]
        )
        .otherwise(
          () => PitchClassLetter.STEPS[this.value] ?? ""
        ) as PitchClassLetter["value"]
    );
  }
  static readonly ACCIDENTAL_PITCHECLASSES = [1, 3, 6, 8, 10] as const;
}
