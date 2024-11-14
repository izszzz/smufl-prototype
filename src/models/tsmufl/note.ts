import * as Core from "../core";
import * as SMUFL from "smufl";
export class Note extends Core.Note {
  track!: SMUFL.Track;
  bar!: SMUFL.Bar;
  rest;
  chord;
  notehead;
  stem: SMUFL.Stem | null = null;
  flag: SMUFL.Flag | null = null;

  get bBox() {
    const top =
      this.flag?.glyph.bBox.top ??
      this.stem?.glyph.bBox.top ??
      this.notehead?.glyph.bBox.top ??
      0;
    const left = this.notehead?.glyph.bBox.left ?? 0;
    const bottom = this.notehead?.glyph.bBox.bottom ?? 0;
    const right =
      (this.flag?.glyph.advancedWidth ?? 0) +
      (this.notehead?.glyph.advancedWidth ?? 0);
    return new SMUFL.BBox({ top, bottom, left, right });
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
  get isStem() {
    if (this.fraction === 1) return false;
    return true;
  }
  private get isNotehead() {
    if (this.rest) return false;
    return true;
  }
  get isFlag() {
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
    rest?: boolean;
    chord?: boolean;
  } & Core.Note) {
    super(note);
    this.rest = rest;
    this.chord = chord;
    this.notehead = this.isNotehead ? new SMUFL.Notehead({ note: this }) : null;
  }
}
