import * as Core from "core";
import * as Sheet from "sheet";
import { Barline, Clef } from "src/const/musicxml/4.0/musicxml";
import { match } from "ts-pattern";
import { filter, isTruthy, map, pipe, prop } from "remeda";

export class Stave {
  readonly id;
  barId;
  trackId;
  clef;
  barline;
  score!: Sheet.Score;
  ligature: Sheet.Ligature | null = null;
  get bar() {
    return this.score.bars.find((bar) => bar.id === this.barId)!;
  }
  get notes() {
    return this.bar.notes.filter((note) => note.staveId === this.id);
  }
  get width() {
    return -1;
  }
  get minWidth() {
    return -1;
  }
  get height() {
    return -1;
  }
  get y() {
    return (this.height + 6.5) * this.id;
  }
  get prev() {
    return this.bar.prev?.staves[this.id];
  }
  constructor({
    id,
    barId,
    trackId,
    clef,
    barline,
  }: {
    id: number;
    barId: number;
    trackId: number;
    barline: Barline;
    clef?: Clef;
  }) {
    this.id = id;
    this.barId = barId;
    this.trackId = trackId;
    this.clef = clef;
    this.barline = barline;
  }
  draw() {
    this.ligature = new Sheet.Ligature(
      filter(
        [
          this.bar.masterbar.isRowFirst
            ? [
                new Sheet.Glyph(
                  Sheet.GlyphType.Clef,
                  this.resolveClef().$$.line?.[0]?._ ?? 0
                ),
              ]
            : null,
          this.bar.masterbar.isFirst
            ? [new Sheet.Ligature(this.bar.keysignature.ligature.glyphLists)]
            : null,
          this.bar.masterbar.isFirst
            ? filter([this.bar.timesignature.ligature], isTruthy)
            : null,
          ...pipe(
            this.notes,
            map(prop("ligature")),
            filter(isTruthy),
            map((x) => [x])
          ),
          [new Sheet.Glyph(Sheet.GlyphType.Barline, 1)],
        ],
        isTruthy
      ),
      0
    );
  }
  resolveClef(): Clef {
    return this.clef ?? this.prev!.resolveClef();
  }
  getClefScientificPitchNotation() {
    return new Core.Units.ScientificPitchNotation(
      match(this.resolveClef().$$.sign?.[0]._)
        .with("G", (value) => `${value}4`)
        .with("F", (value) => `${value}3`)
        .exhaustive()
    );
  }
}
