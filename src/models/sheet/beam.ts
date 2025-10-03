import * as Sheet from "sheet";
export class Beam {
  trackId;
  staveId;
  noteIds;
  voice;
  level;
  score!: Sheet.Score;
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
    return this.score.notes.filter((note) => this.noteIds.includes(note.id));
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
