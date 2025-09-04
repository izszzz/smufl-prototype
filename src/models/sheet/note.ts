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
  override get params() {
    return {
      ...super.params,
      staveId: this.staveId,
      chord: this.chord,
      stem: this.stem,
      rest: this.rest,
      voice: this.voice,
      staff: this.staff,
    };
  }
  get track() {
    return this.score.tracks.find((track) => track.id === this.trackId)!;
  }
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
    if (isDefined(this.rest)) return null;
    return match(
      this.pitch.toPitchClass().toPitchClassName(this.keysignature.tonality)
        .accidental
    )
      .with("#", () => Sheet.AccidentalType.Sharp)
      .with("b", () => Sheet.AccidentalType.Flat)
      .with("", () => null)
      .exhaustive();
    // audioで使うかも
    // this.keysignature.accidentalPitchClasses.some(
    //   (accidentalPitchClass) =>
    //     this.pitch.toPitchClass().equal(accidentalPitchClass)
    // )
    //   ? match(this.keysignature.tonality)
    //       .with(
    //         Core.Enums.Tonality.Major as 0,
    //         () => Sheet.AccidentalType.Sharp
    //       )
    //       .with(Core.Enums.Tonality.Minor as 1, () => Sheet.AccidentalType.Flat)
    //       .exhaustive()
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
          this.pitch.toScientificPitchNotation(this.keysignature.tonality)
        ) /
        2
    );
  }
  get type() {
    return <NoteType>{
      _: match(Math.pow(2, Math.floor(Math.log2(this.duration.value))))
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
    return this.pitch.value > 80 || this.pitch.value <= 60
      ? Math.ceil((this.pitch.value - 59) / 2)
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
            isDefined(this.rest)
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
