import * as Core from "core";
import * as Sheet from "sheet";
import * as R from "remeda";
import {
  NoteType,
  Rest,
  Staff,
  Stem,
  Voice,
} from "src/const/musicxml/4.0/musicxml";
import { P, match } from "ts-pattern";

export class Note extends Core.Note {
  track!: Sheet.Track;
  bar!: Sheet.Bar;
  stave!: Sheet.Stave;
  chord;
  stem;
  type;
  rest;
  voice;
  staff;
  flag: null = null;

  // TODO: refactor
  get line() {
    if (R.isNonNullish(this.rest)) {
      if (this.rest.$?.measure === "yes") return 0;
      return match(this.type?._)
        .with(P.union("quarter", "half"), () => 2)
        .otherwise(() => 0);
    }
    const sign = (this.stave.clef ?? this.stave.prev?.clef)?.$$.sign?.[0]._;
    if (sign === "G") {
      return (
        ((this.pitch.octave - 4) * Core.Metadata.majorWhiteNotes.length +
          this.pitch.whiteKey -
          2) /
        2
      );
    }
    if (sign === "F") {
      return (
        ((this.pitch.octave - 4) * Core.Metadata.majorWhiteNotes.length +
          this.pitch.whiteKey -
          2 +
          12) /
        2
      );
    }
    return 0;
  }
  // y軸の情報はレンダーエンジン側によって解釈が変わるのでｓｖｇ化する際にyを求める
  // get y() {
  //   if (this.rest) {
  //     return 0;
  //   }
  //   console.log(this.pitch);
  //   return (
  //     BASE_PITCH_Y() -
  //     (this.pitch.octave * Core.Metadata.majorWhiteNotes.length +
  //       this.pitch.whiteKey)
  //   );
  // }
  get legerLine() {
    return this.pitch.value > 80 || this.pitch.value <= 60
      ? Math.ceil((this.pitch.value - 59) / 2)
      : 0;
  }

  constructor({
    rest,
    chord,
    type,
    stem,
    voice,
    staff,
    ...note
  }: {
    type?: NoteType;
    stem?: Stem;
    rest?: Rest;
    chord: boolean;
    staff?: Staff["staff"];
    voice: Voice["voice"];
  } & Core.Note) {
    super(note);
    this.chord = chord;
    this.stem = stem;
    this.type = type;
    this.rest = rest;
    this.staff = staff;
    this.voice = voice;
  }
}
