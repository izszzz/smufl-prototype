import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Note extends Core.Note {
  track!: Sheet.Track;
  bar!: Sheet.Bar;
  chord;
  stem: null = null;
  flag: null = null;
  get fraction() {
    let str = "";
    switch (this.bar.timesignature.denominator / this.duration) {
      case 1:
        str = "Whole";
        break;
      case 2:
        str = "Half";
        break;
      case 4:
        str = "Quarter";
        break;
    }
    return str;
  }
  get glyphs() {
    if (this.rest) {
      return SMUFL.Glyph.find("rests", (v) => v.includes(this.fraction));
    } else {
      return;
    }
  }
  get rest() {
    return SMUFL.Glyph.find("rests", (v) => v.includes(this.fraction));
  }
  get notehead() {
    return SMUFL.Glyph.find("noteheads", (v) =>
      v.includes(this.fraction === "Quarter" ? "noteheadBlack" : this.fraction)
    );
  }

  constructor({
    rest,
    chord,
    ...note
  }: {
    rest: boolean;
    chord: boolean;
  } & Core.Note) {
    super(note);

    this.chord = chord;
  }
}
