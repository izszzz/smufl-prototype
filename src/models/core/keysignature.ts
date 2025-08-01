import * as Core from "core";
export class Keysignature extends Core.Event {
  tonality;
  accidental;
  get accidentalPitchClasses() {
    return Core.Metadata[
      `${this.tonality ? "minor" : "major"}TonicsByAccidentals`
    ]
      .slice(0, Math.abs(this.accidental))
      .map(
        (pitch) =>
          new Core.Pitch({
            midiNoteNumber: new Core.Unit.MidiNoteNumber(pitch),
          })
      );
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
