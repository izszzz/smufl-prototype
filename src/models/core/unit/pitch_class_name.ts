import { PitchClass } from "./pitch_class";
import { match } from "ts-pattern";
import musicTheory from "../../../const/music-theory.json";

type DiatonicScale = (typeof musicTheory.diatonicScale)[number];
type Accidental = (typeof musicTheory.accidentals)[number] | "";

export class PitchClassName {
  _brandPitchClassName!: never;
  constructor(public value: `${DiatonicScale}${Accidental}`) {}
  get accidental() {
    return this.value.at(-1) as Accidental;
  }
  get tone() {
    return this.value.at(0) as DiatonicScale;
  }
  get toneIndex() {
    return musicTheory.diatonicScale.indexOf(this.tone);
  }
  getDegree(pitchClassName: PitchClassName) {
    return this.toneIndex - pitchClassName.toneIndex;
  }
  toPitchClass() {
    return new PitchClass(
      musicTheory.chromaticScale.indexOf(this.tone) +
        match(this.accidental)
          .with("#", () => 1)
          .with("b", () => -1)
          .with("", () => 0)
          .exhaustive()
    );
  }
}
