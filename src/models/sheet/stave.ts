import * as Sheet from "sheet";
import { Barline, Clef } from "src/const/musicxml/4.0/musicxml";

export class Stave {
  readonly id;
  barId;
  trackId;
  barline;
  _clef;
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
  get clef(): Clef {
    return this._clef ? this._clef : this.prev!.clef;
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
    this._clef = clef;
    this.barline = barline;
  }
}
