interface Metadata {
  defaultValue: {
    track: {preset: 0},
    metaevent: {
      Timesignature: {denominator: 4, numerator: 4},
      Keysignature: {tonality: false, accidental: 0},
      Bpm: {value: 120}
    }
  },
  keysignature: {major: [5, 0, 7, 2, 9, 4, 11], minor: [11, 4, 9, 2, 7, 0, 5]}
}

declare const Metadata: Metadata;

export = Metadata;