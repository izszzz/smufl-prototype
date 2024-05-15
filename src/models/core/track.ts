import * as R from "remeda";
import * as Core from "./";
import { Identifier } from "../../helpers";

interface ITrack extends Identifier {
  name?: string;
  preset?: number;
  notes: Core.Note[];
  score: Core.Score;
  metadata?: Core.Metadata;
  time?: Core.Time;
}
interface Constructor
  extends Omit<ITrack, "notes" | "bars" | "metadata" | "time"> {
  notes: ReturnType<typeof Core.Note.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>;
}
interface Build extends Omit<Constructor, "id" | "score"> {}

export class Track implements ITrack {
  id;
  notes;
  metadata?;
  name;
  score;
  preset;
  time;
  constructor({ id, name, notes, score, metadata, preset }: Constructor) {
    this.id = id;
    this.score = score;
    this.name = name;
    this.preset = preset ?? 54;
    if (metadata) this.metadata = new Core.Metadata(metadata);
    this.notes = notes.map((note) => new Core.Note({ track: this, ...note }));
    this.time = new Core.Time({
      start: R.first(notes)?.time.start ?? 0,
      end: R.last(notes)?.time.end ?? 0,
    });
  }
  getMetadata() {
    return this.metadata ?? this.score.metadata;
  }
  static build(params: Build) {
    return params;
  }
}
