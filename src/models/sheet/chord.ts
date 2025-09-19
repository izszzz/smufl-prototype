import { filter, isTruthy, map, pipe, prop } from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
export class Chord extends Core.Event {
  readonly id;
  staveId;
  trackId;
  score!: Sheet.Score;
  ligature: Sheet.Ligature | null = null;
  get notes() {
    return this.score.notes.filter((note) => note.chordId === this.id);
  }
  constructor({
    id,
    staveId,
    trackId,
    ...event
  }: {
    id: number;
    staveId: number;
    trackId: number;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = id;
    this.staveId = staveId;
    this.trackId = trackId;
  }
  draw() {
    this.ligature = new Sheet.Ligature(
      [pipe(this.notes, map(prop("ligature")), filter(isTruthy))],
      0
    );
  }
}
