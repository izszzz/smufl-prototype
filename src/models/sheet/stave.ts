import * as Core from "core";
import * as Sheet from "sheet";
import { Clef } from "src/const/musicxml/4.0/musicxml";
import { match } from "ts-pattern";
import {
  entries,
  filter,
  groupByProp,
  isTruthy,
  map,
  pipe,
  piped,
  prop,
  last,
} from "remeda";

export class Stave {
  readonly id;
  barId;
  trackId;
  clefs;
  score!: Sheet.Score;
  ligature: Sheet.Ligature | null = null;
  get params() {
    return {
      id: this.id,
      barId: this.barId,
      trackId: this.trackId,
      clefs: this.clefs,
    };
  }
  get bar() {
    return this.score.bars.find(
      (bar) => bar.trackId === this.trackId && bar.id === this.barId
    )!;
  }
  get notes() {
    return this.bar.notes.filter((note) => note.staveId === this.id);
  }
  get chords() {
    return this.bar.chords.filter((chord) => chord.staveId === this.id);
  }
  get beams() {
    return this.bar.beams.filter((beam) => beam.staveId === this.id);
  }
  get events() {
    return this.bar.events.filter((event) => event.staveId === this.id);
  }
  get height() {
    return -1;
  }
  get y() {
    return this.id * this.height + (this.id - 1) * 6.5;
  }
  get prev() {
    return this.bar.prev?.staves[this.id];
  }
  constructor({
    id,
    barId,
    trackId,
    clefs: clef,
  }: {
    id: number;
    barId: number;
    trackId: number;
    clefs?: Clef[];
  }) {
    this.id = id;
    this.barId = barId;
    this.trackId = trackId;
    this.clefs = clef;
  }
  draw() {
    this.ligature = new Sheet.Ligature(
      filter(
        [
          this.bar.masterbar.isRowFirst
            ? [
                new Sheet.Glyph(
                  Sheet.GlyphType.Clef,
                  this.resolveClefs()[0]?.$$.line?.[0]?._ ?? 0
                ),
              ]
            : null,
          this.bar.masterbar.isFirst
            ? [
                new Sheet.Ligature(
                  this.bar.keysignature.ligature.glyphLists,
                  match(this.resolveClefs()[0]?.$$.sign?.[0]._)
                    .with("G", () => 0)
                    .with("F", () => -1)
                    .exhaustive()
                ),
              ]
            : null,
          this.bar.masterbar.isFirst
            ? filter([this.bar.timesignature.ligature], isTruthy)
            : null,
          pipe(
            this.events,
            groupByProp("voice"),
            entries(),
            map(
              piped(
                last(),
                map(prop("ligature")),
                filter(isTruthy),
                (ligatures) =>
                  new Sheet.Ligature(ligatures.map((ligature) => [ligature]))
              )
            )
          ),
        ],
        isTruthy
      ),
      0
    );
  }
  resolveClefs(): Clef[] {
    return this.clefs ?? this.prev!.resolveClefs();
  }
  getClefScientificPitchNotation() {
    return new Core.Units.ScientificPitchNotation(
      match(this.resolveClefs()[0]?.$$.sign?.[0]._)
        .with("G", (value) => `${value}4`)
        .with("F", (value) => `${value}3`)
        .exhaustive()
    );
  }
}
