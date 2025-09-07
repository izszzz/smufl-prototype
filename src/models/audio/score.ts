import * as Audio from ".";
import * as Core from "core";
export class Score<
  Note extends Audio.Note = Audio.Note,
  Track extends Audio.Track = Audio.Track,
> extends Core.Score<Note, Track> {
  constructor(
    params: ConstructorParameters<typeof Core.Score<Note, Track>>[0]
  ) {
    super(params);
    for (const note of this.notes) note.score = this;
  }
  static create(...params: Parameters<typeof Core.Score.create>) {
    const core = super.create(...params);
    return new Score({
      ...core,
      notes: core.tracks.flatMap((track) =>
        track.notes.map((note) => new Audio.Note(note))
      ),
      tracks: core.tracks.map((track) => new Audio.Track(track)),
    });
  }
}
