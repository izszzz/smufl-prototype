import * as R from "remeda";
import * as Core from "./";
import { Identifier } from "../../helpers";

interface ITrack extends Identifier {
  name?: string;
  preset?: number;
  elements: Core.Element[];
  score: Core.Score;
  metadata?: Core.Metadata;
  bars?: Core.Bar[];
  time?: Core.Time;
}
interface Constructor
  extends Omit<ITrack, "elements" | "bars" | "metadata" | "time"> {
  elements: ReturnType<typeof Core.Note.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>;
}
interface Build extends Omit<Constructor, "id" | "score"> {}

export class Track implements ITrack {
  id;
  elements: Core.Element[];
  metadata?;
  name;
  score;
  preset;
  time;
  bars?: Core.Bar[];
  constructor({ id, name, elements, score, metadata, preset }: Constructor) {
    this.id = id;
    this.score = score;
    this.name = name;
    this.preset = preset ?? 54;
    if (metadata) this.metadata = new Core.Metadata(metadata);
    this.elements = elements.map(
      (note) => new Core.Note({ track: this, ...note })
    );
    this.time = new Core.Time({
      start: R.first(elements)?.time.start ?? 0,
      end: R.last(elements)?.time.end ?? 0,
    });
  }
  getMetadata() {
    return this.metadata ?? this.score.metadata;
  }
  static build(params: Build) {
    return params;
  }
}
