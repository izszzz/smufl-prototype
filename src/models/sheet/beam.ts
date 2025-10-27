import { entries, groupBy, first, map, pipe } from "remeda";
import { Score } from "./score";
export class Beam {
  trackId;
  barId;
  staveId;
  noteIds;
  voice;
  level;
  score!: Score;
  get params() {
    return {
      trackId: this.trackId,
      staveId: this.staveId,
      barId: this.barId,
      noteIds: this.noteIds,
      voice: this.voice,
      level: this.level,
    };
  }
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
    barId,
    staveId,
    noteIds,
    voice,
    level,
  }: {
    level: number;
    trackId: number;
    barId: number;
    staveId: number;
    noteIds: number[];
    voice: number;
  }) {
    this.trackId = trackId;
    this.barId = barId;
    this.staveId = staveId;
    this.noteIds = noteIds;
    this.voice = voice;
    this.level = level;
  }
}
