import * as Core from "core";

export class Keysignature extends Core.Keysignature {
  override get accidentalPitchClasses() {
    return super.accidentalPitchClasses
      .map((pitch) => {
        // if (this.tonality) {
        //   if (pitch.midiNoteNumber.value < 5) pitch.midiNoteNumber.value += 12;
        // } else {
        //   if (pitch.midiNoteNumber.value < 10) pitch.midiNoteNumber.value += 12;
        // }
        return pitch;
      })
      .reverse();
  }
}
