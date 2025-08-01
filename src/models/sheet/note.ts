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

export class Note<
  Pitch extends Sheet.Pitch = Sheet.Pitch,
> extends Core.Note<Pitch> {
  staveId;
  chord;
  stem;
  type;
  rest;
  voice;
  staff;
  flag: null = null;
  score!: Sheet.Score;
  get stave() {
    return this.score.staves.find((stave) => stave.id === this.staveId)!;
  }
  get keysignature() {
    return this.score.keysignatures.find((keysignature) =>
      keysignature.isOverlapped(this)
    );
  }
  // TODO: refactor
  get line() {
    if (R.isDefined(this.rest)) {
      if (this.rest.$?.measure === "yes") return 0;
      return match(this.type?._)
        .with(P.union("quarter", "half"), () => 2)
        .otherwise(() => 0);
    }
    const sign = this.stave.clef.$$.sign?.[0]._;
    if (sign === "G") {
      return (
        ((this.pitch.midiNoteNumber.toScientificPitchNotation(
          Core.Tonality.Major
        ).octave -
          4) *
          Core.Metadata.majorWhiteNotes.length +
          this.pitch.whiteKey -
          2) /
        2
      );
    }
    if (sign === "F") {
      return (
        ((this.pitch.midiNoteNumber.toScientificPitchNotation(
          Core.Tonality.Major
        ).octave -
          4) *
          Core.Metadata.majorWhiteNotes.length +
          this.pitch.whiteKey -
          2 +
          12) /
        2
      );
    }
    return 0;
  }

  get legerLine() {
    return this.pitch.midiNoteNumber.value > 80 ||
      this.pitch.midiNoteNumber.value <= 60
      ? Math.ceil((this.pitch.midiNoteNumber.value - 59) / 2)
      : 0;
  }

  get accidental() {
    return;
  }

  constructor({
    staveId,
    rest,
    chord,
    type,
    stem,
    voice,
    staff,
    ...note
  }: {
    staveId: number;
    type?: NoteType;
    stem?: Stem;
    rest?: Rest;
    chord: boolean;
    staff?: Staff["staff"];
    voice: Voice["voice"];
  } & ConstructorParameters<typeof Core.Note<Pitch>>[0]) {
    super(note);
    this.staveId = staveId;
    this.chord = chord;
    this.stem = stem;
    this.type = type;
    this.rest = rest;
    this.staff = staff;
    this.voice = voice;
  }
}
