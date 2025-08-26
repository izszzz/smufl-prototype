import * as Core from "core";
import musicTheory from "../../const/music-theory.json";
import { match } from "ts-pattern";
export class Keysignature extends Core.Event {
  tonality;
  accidental;
  override get params() {
    return {
      ...super.params,
      tonality: this.tonality,
      accidental: this.accidental,
    };
  }
  get accidentalPitchClasses() {
    return musicTheory[
      `${match(this.tonality)
        .with(Core.Tonality.Major as 0, () => "major" as const)
        .with(Core.Tonality.Minor as 1, () => "minor" as const)
        .exhaustive()}TonicsByAccidentals`
    ]
      .slice(0, Math.abs(this.accidental))
      .map((pitch) => new Core.Unit.PitchClass(pitch));
  }
  constructor({
    tonality,
    accidental,
    ...event
  }: {
    accidental: number;
    tonality: Core.Tonality;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
