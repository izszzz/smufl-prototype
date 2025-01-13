import * as Core from ".";
export class Keysignature extends Core.Event {
  /**
   * - `true`: minor
   * - `false`: major
   */
  tonality;
  accidental;
  constructor({
    tonality,
    accidental,
    ...event
  }: {
    accidental: number;
    tonality: boolean;
  } & Core.Event) {
    super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
