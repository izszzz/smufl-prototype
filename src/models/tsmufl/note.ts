import * as Core from "../core";
import * as SMUFL from ".";
export class Note extends Core.Note {
  track!: SMUFL.Track;
  bar!: SMUFL.Bar;
  rest;
  chord;
  get stem() {
    return this.isStem ? new SMUFL.Stem({ note: this }) : null;
  }
  get notehead() {
    return this.isNotehead ? new SMUFL.Notehead({ note: this }) : null;
  }
  get flag() {
    return this.isFlag ? new SMUFL.Flag({ note: this }) : null;
  }

  get dot() {
    let duration = this.duration;
    let dot = 0;
    while (duration % this.baseDuration !== 0) {
      duration *= 2;
      dot += 1;
    }
    return dot;
  }
  get fraction() {
    return (
      this.bar.masterbar.timesignature.denominator * (1 / this.baseDuration)
    );
  }
  private get isStem() {
    if (this.fraction === 1) return false;
    return true;
  }
  private get isNotehead() {
    if (this.rest) return false;
    return true;
  }
  private get isFlag() {
    if (this.fraction === 4) return false;
    if (this.stem === null) return false;
    return true;
  }
  private get baseDuration() {
    return SMUFL.Metadata.fractions
      .map((fraction) => fraction.length)
      .sort((a, b) => a - b)
      .reduce((prev, cur) => {
        if (cur <= this.duration) return cur;
        return prev;
      });
  }
  constructor({
    rest = false,
    chord = false,
    ...note
  }: {
    stem?: "up" | "down" | null;
    rest?: boolean;
    chord?: boolean;
  } & Core.Note) {
    super(note);
    this.rest = rest;
    this.chord = chord;
  }
}
