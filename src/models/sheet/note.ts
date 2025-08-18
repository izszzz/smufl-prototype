import * as Core from "core";
import * as Sheet from "sheet";
import {
  NoteType,
  Rest,
  Staff,
  Stem,
  Voice,
} from "src/const/musicxml/4.0/musicxml";
import { P, match } from "ts-pattern";
import { filter, isDefined, isTruthy, times } from "remeda";

export class Note extends Core.Note {
  staveId;
  chord;
  stem;
  rest;
  voice;
  staff;
  flag: null = null;
  ligature: Sheet.Ligature | null = null;
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
      ? match(this.keysignature.tonality)
          .with(Core.Tonality.Major as 0, () => Sheet.AccidentalType.Sharp)
          .with(Core.Tonality.Minor as 1, () => Sheet.AccidentalType.Flat)
          .exhaustive()
      : null;
  }
  get line() {
    if (isDefined(this.rest)) {
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
  } & ConstructorParameters<typeof Core.Note>[0]) {
    super(note);
    this.staveId = staveId;
    this.chord = chord;
    this.stem = stem;
    this.rest = rest;
    this.staff = staff;
    this.voice = voice;
  }
  draw() {
    this.ligature = new Sheet.Ligature(
      filter(
        [
          this.accidental
            ? [new Sheet.Glyph(Sheet.GlyphType.Accidental, 0)]
            : null,
          [
            ...(this.legerLine
              ? times(
                  this.legerLine,
                  () => new Sheet.Glyph(Sheet.GlyphType.LegerLine, 0)
                )
              : []),
            this.rest
              ? new Sheet.Glyph(Sheet.GlyphType.Rest, 0)
              : new Sheet.Ligature(
                  filter(
                    [
                      [new Sheet.Glyph(Sheet.GlyphType.Notehead, 0)],
                      this.stem
                        ? [new Sheet.Glyph(Sheet.GlyphType.Stem, 0)]
                        : null,
                    ],
                    isTruthy
                  ),
                  0
                ),
          ],
        ],
        isTruthy
      ),
      this.line
    );
  }
}
