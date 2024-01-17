interface Midi {
  mthd: {
    header: [
      {type: 'text', name: 'type', length: 4},
      {type: 'number', name: 'size', length: 4},
      {type: 'number', name: 'format', length: 2},
      {type: 'number', name: 'trackCount', length: 2},
      {type: 'number', name: 'deltaTime', length: 2}
    ]
  }
}

declare const Midi: Midi;

export = Midi;