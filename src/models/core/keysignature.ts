import * as Core from ".";
export class Keysignature extends Core.Metaevent {
  /**
   * - `true`: minor
   * - `false`: major
   */
  tonality;
  accidental;
  get accidentalKeys() {
    return Core.Metadata[
      this.tonality ? "minorTonicsByAccidentals" : "majorTonicsByAccidentals"
    ].slice(0, Math.abs(this.accidental));
  }
  get whiteKeys() {
    return Core.Metadata[
      this.tonality ? "minorWhiteNotes" : "majorWhiteNotes"
    ].map((i) => Core.Metadata.pitchClasses[i]);
  }
  get blackKeys() {
    return Core.Metadata.pitchClasses.filter(
      (pitchClassNote) => !(this.whiteKeys as number[]).includes(pitchClassNote)
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
