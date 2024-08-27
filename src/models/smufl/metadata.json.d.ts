interface Metadata {
  staffLines: [1, 2, 3, 4, 5, 6],
  defaultFontSize: 4,
  midiMiddleC: 60,
  fractions: [
    {type: 'Whole', value: 1, length: 4},
    {type: 'Half', value: 2, length: 2},
    {type: 'Quarter', value: 4, length: 1},
    {type: '8th', value: 8, length: 0.5},
    {type: '16th', value: 16, length: 0.25}
  ],
  keysignature: {sharp: [0, -3, 1, -2, -5, -1, -4], flat: [0, 3, -1, 2, -2, 1, -3]},
  clef: {
    treble: {
      keysignature: {sharp: {baseStaffLine: 5, y: 0}, flat: {baseStaffLine: 3, y: -2}}
    },
    bass: {keysignature: {sharp: {baseStaffLine: 4}, flat: {baseStaffLine: 2}}},
    alto: {keysignature: {sharp: {baseStaffLine: 4.5}, flat: {baseStaffLine: 2.5}}}
  }
}

declare const Metadata: Metadata;

export = Metadata;