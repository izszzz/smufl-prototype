import { Tonality } from "core";
import { PitchClassName } from "./pitch_class_name";
import { P, match } from "ts-pattern";
import musicTheory from "../../../const/music-theory.json";
import { IntRange } from "type-fest";

export class PitchClass {
  value: IntRange<0, 12>;
  _brandPitchClass!: never;
  constructor(value: number) {
    this.value = this.validate(value);
  }
  toPitchClassName(tonality: Tonality) {
    return new PitchClassName(
      match(this.value)
        .with(
          P.union(...musicTheory.accidentalPitchClasses),
          (pitchClass) =>
            musicTheory.chromaticScale[
              pitchClass +
                match(tonality)
                  .with(Tonality.Major as 0, () => 1)
                  .with(Tonality.Minor as 1, () => -1)
                  .exhaustive()
            ]!.toString() + musicTheory.accidentals[tonality]
        )
        .otherwise(
          () => musicTheory.chromaticScale[this.value]!
        ) as PitchClassName["value"]
    );
  }
  private validate(value: number) {
    if (!this.isInRange(value)) throw Error();
    return value;
  }
  private isInRange(value: number): value is IntRange<0, 12> {
    return 0 <= value && value <= 11;
  }
}
