import * as Core from "core";
export class Keysignature extends Core.Event {
  tonality;
  accidental;
  get isMajor() {
    return this.tonality === Core.Tonality.Major;
  }
  get accidentalPitchClasses() {
    return Core.Metadata[
      `${this.isMajor ? "major" : "minor"}TonicsByAccidentals`
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
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.tonality = tonality;
    this.accidental = accidental;
  }
}
