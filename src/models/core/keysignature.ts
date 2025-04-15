import * as Core from "core";
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
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
