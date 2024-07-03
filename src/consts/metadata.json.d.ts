interface Metadata {
  staffLines: [1, 2, 3, 4, 5, 6];
  defaultFontSize: 4;
  midiMiddleC: 60;
  baseWhiteKeys: [0, 2, 4, 5, 7, 9, 11];
  baseOctaveKeys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  fractions: [
    { type: "Whole"; value: 1; length: 4 },
    { type: "Half"; value: 2; length: 2 },
    { type: "Quarter"; value: 4; length: 1 },
    { type: "8th"; value: 8; length: 0.5 },
    { type: "16th"; value: 16; length: 0.25 },
  ];
}

declare const Metadata: Metadata;

export = Metadata;
