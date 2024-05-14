interface Metadata {
  staffLines: [1, 2, 3, 4, 5, 6],
  defaultFontSize: 4,
  midiMiddleC: 60,
  baseWhiteKeys: [0, 2, 4, 5, 7, 9, 11],
  baseOctaveKeys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  fractions: [
    {type: 'Whole', value: 1},
    {type: 'Half', value: 2},
    {type: 'Quarter', value: 4},
    {type: '8th', value: 8},
    {type: '16th', value: 16}
  ],
  timeSignature: {denominator: 4, numerator: 4},
  bpm: 120
}

declare const Metadata: Metadata;

export = Metadata;