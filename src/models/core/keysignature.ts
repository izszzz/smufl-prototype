import * as Core from ".";
export class Keysignature extends Core.Metaevent {
  /**
   * - `true`: minor
   * - `false`: major
   */
  tonality;
  accidental;
  get diffKeys() {
    return Core.Metadata.keysignature[this.tonality ? "minor" : "major"].slice(
      0,
      Math.abs(this.accidental)
    );
  }
  constructor({
    tonality,
    accidental,
    ...event
  }: {
    accidental: number;
    tonality: boolean;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
