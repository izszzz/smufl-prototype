interface Metadata {
  defaultValue: {
    track: {preset: 0},
    metaevent: {
      Timesignature: {denominator: 4, numerator: 4},
      Keysignature: {tonality: false, accidental: 0},
      Bpm: {value: 120}
    }
  },
  pitchClasses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  majorWhiteNotes: [0, 2, 4, 5, 7, 9, 11],
  minorWhiteNotes: [0, 2, 3, 5, 7, 8, 10],
  majorTonicsByAccidentals: [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5],
  minorTonicsByAccidentals: [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2]
}

declare const Metadata: Metadata;

export = Metadata;