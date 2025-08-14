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
    )!;
  }
  get accidental() {
    // TODO: Natural
    return this.keysignature.accidentalPitchClasses.some(
      (accidentalPitchClass) =>
        this.pitch.midiNoteNumber.toPitchClass().value ===
        accidentalPitchClass.value
    )
      ? this.keysignature.tonality === Core.Tonality.Major
        ? Sheet.AccidentalType.Sharp
        : Sheet.AccidentalType.Flat
      : null;
  }
  get line() {
    if (R.isDefined(this.rest)) {
      if (this.rest.$?.measure === "yes") return 0;
      return match(this.type._)
        .with(P.union("quarter", "half"), () => 2)
        .otherwise(() => 0);
    }
    return (
      (this.stave.resolveClef().$$.line?.[0]?._ ?? 0) -
      this.stave
        .getClefScientificPitchNotation()
        .getDegree(
          this.pitch.midiNoteNumber.toScientificPitchNotation(
            this.keysignature.tonality
          )
        ) /
        2
    );
  }
  get type() {
    return <NoteType>{
      _: match(Math.pow(2, Math.floor(Math.log2(this.duration))))
        .with(4, () => "whole")
        .with(2, () => "half")
        .with(1, () => "quarter")
        .with(0.5, () => "eighth")
        .with(0.25, () => "16th")
        .with(0.125, () => "32th")
        .with(0.0625, () => "64th")
        .with(0.03125, () => "128th")
        .with(0.015625, () => "256th")
        .with(0.0078125, () => "512th")
        .with(0.00390625, () => "1024th")
        .otherwise(() => "quarter"),
    };
  }

  // FIXME:
  get legerLine() {
    return this.pitch.midiNoteNumber.value > 80 ||
      this.pitch.midiNoteNumber.value <= 60
      ? Math.ceil((this.pitch.midiNoteNumber.value - 59) / 2)
      : 0;
  }

  constructor({
    staveId,
    rest,
    chord,
    stem,
    voice,
    staff,
    ...note
  }: {
    staveId: number;
    chord: boolean;
    stem?: Stem;
    rest?: Rest;
    staff?: Staff["staff"];
    voice?: Voice["voice"];
  } & ConstructorParameters<typeof Core.Note<Pitch>>[0]) {
    super(note);
    this.staveId = staveId;
    this.chord = chord;
    this.stem = stem;
    this.rest = rest;
    this.staff = staff;
    this.voice = voice;
  }
}
