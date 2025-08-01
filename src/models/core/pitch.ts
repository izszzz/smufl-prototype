import * as Core from "core";
import Metadata from "./metadata.json";
export class Pitch {
  midiNoteNumber;
  get whiteKey() {
    return (Metadata.majorWhiteNotes as number[]).indexOf(
      (Metadata.pitchClasses as number[]).indexOf(
        this.midiNoteNumber.toPitchClass().value
      )
    );
  }
  constructor({
    midiNoteNumber,
  }: {
    midiNoteNumber: Core.Unit.MidiNoteNumber;
  }) {
    this.midiNoteNumber = midiNoteNumber;
  }
}
