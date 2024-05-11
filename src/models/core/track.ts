import * as R from "remeda";
import * as Core from "./";
import { Identifier } from "../../helpers";

interface ITrack extends Identifier {
  name?: string;
  preset?: number;
  elements: Core.Element[];
  score?: Core.Score;
  metadata?: Core.Metadata;
  bars?: Core.Bar[];
  time?: Core.Time;
}
interface ITrackObject
  extends Omit<
    ITrack,
    "id" | "elements" | "score" | "bars" | "metadata" | "time"
  > {
  elements: ReturnType<typeof Core.Note.build>[];
  bars?: ReturnType<typeof Core.Bar.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>;
  score?: ReturnType<typeof Core.Score.build>;
  time?: ReturnType<typeof Core.Time.build>;
}

export class Track implements ITrack {
  id;
  elements;
  bars;
  metadata;
  name;
  score;
  preset;
  time;
  constructor({
    id,
    name,
    elements: notes,
    score,
    metadata,
    preset,
    bars,
  }: Omit<ITrack, "time">) {
    this.id = id;
    this.score = score;
    this.name = name;
    this.preset = preset ?? 54;
    this.metadata = metadata;
    this.time = new Core.Time({
      start: R.first(notes)?.time.start ?? 0,
      end: R.last(notes)?.time.end ?? 0,
    });
    this.elements = notes;
    this.bars = bars;
  }
  getMetadata() {
    if (!this.score) throw new Error();
    return this.metadata ?? this.score.metadata;
  }
  static build(params: ITrackObject) {
    return params;
  }
}
