interface Metadata {
  type: ['score', 'track', 'barline', 'clef', 'timeSig', 'note', 'accidental'],
  staffLines: [1, 2, 3, 4, 5, 6],
  midiMiddleC: 60,
  baseWhiteKeys: [0, 2, 4, 5, 7, 9, 11],
  baseOctaveKeys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  noteFractions: ['Whole', 'Half', 'Quarter', '8th', '16th']
}

declare const Metadata: Metadata;

export = Metadata;