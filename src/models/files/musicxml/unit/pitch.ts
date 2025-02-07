import * as Core from "core";
export class Pitch {
  protected _pitchBrand!: never;
  constructor(public value: { step: string; octave: number }) {}
  toCore() {
    const steps = [
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
    return new Core.Unit.Pitch(
      (this.value.octave + 1) * 12 + steps.indexOf(this.value.step)
    );
  }
}
