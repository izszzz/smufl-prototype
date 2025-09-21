import * as Core from "core";
import * as Sheet from "sheet";
import { NoteType, Stem } from "src/const/musicxml/4.0/musicxml";
import { P, match } from "ts-pattern";
import { filter, isTruthy, times } from "remeda";

export class Note extends Core.Note {
  staveId;
  chordId;
  stem;
  rest;
  voice;
  flag: null = null;
  ligature: Sheet.Ligature | null = null;
  score!: Sheet.Score;
  override get params() {
    return {
      ...super.params,
      chordId: this.chordId,
      staveId: this.staveId,
      stem: this.stem,
      rest: this.rest,
      voice: this.voice,
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
    if (this.rest) return null;
    return match(
      this.pitch.toPitchClass().toPitchClassName(this.keysignature.tonality)
        .accidental
    )
      .with("#", () => Sheet.AccidentalType.Sharp)
      .with("b", () => Sheet.AccidentalType.Flat)
      .with("", () => null)
      .exhaustive();
  }
  get line() {
    if (this.rest) {
      if (this.stave.bar.masterbar.duration.equal(this.duration)) return 3;
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
        .with(0.125, () => "32nd")
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
    rest = false,
    chordId,
    stem,
    voice,
    ...note
  }: {
    staveId: number;
    chordId?: number;
    stem?: Stem;
    rest?: boolean;
    voice: number;
  } & ConstructorParameters<typeof Core.Note>[0]) {
    super(note);
    this.staveId = staveId;
    this.chordId = chordId;
    this.stem = stem;
    this.rest = rest;
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
