import Metadata from "../metadata.json";
export class Pitch {
  _pitchBrand!: never;
  get pitchClassesLength() {
    return Metadata.pitchClasses.length;
  }
  get pitchClass() {
    return (
      ((this.value % this.pitchClassesLength) + this.pitchClassesLength) %
      this.pitchClassesLength
    );
  }
  get octave() {
    return Math.trunc(this.value / this.pitchClassesLength) - 1;
  }
  get whiteKey() {
    return (Metadata.majorWhiteNotes as number[]).indexOf(
      (Metadata.pitchClasses as number[]).indexOf(this.pitchClass)
    );
  }
  constructor(public value: number) {}
}
