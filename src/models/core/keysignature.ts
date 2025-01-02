import * as Core from ".";
export class Keysignature extends Core.Event {
  /**
   * - `true`: minor
   * - `false`: major
   */
  tonality;
  accidental;
  // get accidentalKeys() {
  //   return Core.Metadata[
  //     this.tonality ? "minorTonicsByAccidentals" : "majorTonicsByAccidentals"
  //   ].slice(0, Math.abs(this.accidental));
  // }
  // get whiteKeys() {
  //   return Core.Metadata[
  //     this.tonality ? "minorWhiteNotes" : "majorWhiteNotes"
  //   ].map((i) => Core.Metadata.pitchClasses[i]);
  // }
  // get blackKeys() {
  //   return Core.Metadata.pitchClasses.filter(
  //     (pitchClassNote) => !(this.whiteKeys as number[]).includes(pitchClassNote)
  //   );
  // }
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
