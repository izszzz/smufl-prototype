import * as Sheet from "sheet";
import { entries, groupBy, first, map, pipe } from "remeda";
export class Beam {
  trackId;
  staveId;
  noteIds;
  voice;
  level;
  score!: Sheet.Score;
  get firstNote() {
    return this.groupedNotes[0]!;
  }
  get lastNote() {
    return this.groupedNotes.at(-1)!;
  }
  get groupedNotes() {
    return pipe(
      groupBy(this.notes, (note) => note.start.value),
      entries(),
      map(([, notes]) => first(notes))
    );
  }
  get params() {
    return {
      trackId: this.trackId,
      staveId: this.staveId,
      noteIds: this.noteIds,
      voice: this.voice,
      level: this.level,
    };
  }
  get notes() {
    return this.stave.bar.track.notes.filter((note) =>
      this.noteIds.includes(note.id)
    );
  }
  get stave() {
    return this.score.staves.find((stave) => stave.id === this.staveId)!;
  }
  constructor({
    trackId,
    staveId,
    noteIds,
    voice,
    level,
  }: {
    level: number;
    trackId: number;
    staveId: number;
    noteIds: number[];
    voice: number;
  }) {
    this.trackId = trackId;
    this.staveId = staveId;
    this.noteIds = noteIds;
    this.voice = voice;
    this.level = level;
  }
}
