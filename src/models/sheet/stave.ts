import * as Core from "core";
import * as Sheet from "sheet";
import { Barline, Clef } from "src/const/musicxml/4.0/musicxml";
import { match } from "ts-pattern";

export class Stave {
  readonly id;
  barId;
  trackId;
  clef;
  barline;
  score!: Sheet.Score;
  get bar() {
    return this.score.bars.find((bar) => bar.id === this.barId)!;
  }
  get notes() {
    return this.bar.notes.filter((note) => note.staveId === this.id);
  }
  get width() {
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
    clef?: Clef;
    barline?: Barline;
  }) {
    this.id = id;
    this.barId = barId;
    this.trackId = trackId;
    this.clef = clef;
    this.barline = barline;
  }
  resolveClef(): Clef {
    return this.clef ?? this.prev!.resolveClef();
  }
  getClefScientificPitchNotation() {
    return new Core.Unit.ScientificPitchNotation(
      match(this.resolveClef().$$.sign?.[0]._)
        .with("G", (value) => `${value}4`)
        .with("F", (value) => `${value}3`)
        .exhaustive()
    );
  }
}
