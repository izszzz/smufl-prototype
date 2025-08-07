import * as Core from "core";
export class Pitch {
  midiNoteNumber;
  constructor({
    midiNoteNumber,
  }: {
    midiNoteNumber: Core.Unit.MidiNoteNumber;
  }) {
    this.midiNoteNumber = midiNoteNumber;
  }
}
