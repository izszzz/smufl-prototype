import * as Core from "core";
export class Pitch {
  protected _pitchBrand!: never;
  constructor(public value: { step: string; octave: number }) {}
  toCore() {
    const steps = ["C", "D", "E", "F", "G", "A", "B"];
    return new Core.Unit.Pitch(
      (steps.indexOf(this.value.step) + 1) * 12 * (this.value.octave + 1)
    );
  }
}
