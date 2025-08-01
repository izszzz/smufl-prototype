import * as Core from "core";

export class Keysignature extends Core.Keysignature {
  override get accidentalPitchClasses() {
    return super.accidentalPitchClasses
      .map((pitch) => {
        if (this.tonality) {
          if (pitch.midiNoteNumber < 5) pitch.midiNoteNumber += 12;
        } else {
          if (pitch.midiNoteNumber < 10) pitch.midiNoteNumber += 12;
        }
        return pitch;
      })
      .reverse();
  }
}
