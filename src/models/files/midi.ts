import { midiParser } from "../../parser/midi_parser";

export class Midi {
  constructor(arrayBuffer: ArrayBuffer) {
    midiParser.parse(new Uint8Array(arrayBuffer));
  }
  static calcDuration(deltaTime: number, resolution: number) {
    return deltaTime / resolution;
  }
}
