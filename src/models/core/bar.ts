import { Identifier } from "../../helpers";
import * as Core from "./";

interface IBar extends Identifier, Core.ILink<Bar> {
  track: Core.Track;
  metadata?: Core.Metadata;
  notes: Core.Note[];
  time?: Core.Time;
}
interface IBarObject
  extends Omit<IBar, "track" | "metadata" | "notes" | "time"> {
  track?: ReturnType<typeof Core.Track.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>[];
  notes: ReturnType<typeof Core.Note.build>[];
  time?: ReturnType<typeof Core.Time.build>;
}

export class Bar implements IBar {
  id;
  notes;
  track;
  metadata?;
  prev?;
  next?;
  constructor({ id, track, metadata, prev, next, notes }: IBar) {
    this.id = id;
    this.next = next;
    this.prev = prev;
    this.track = track;
    this.metadata = metadata;
    this.notes = notes;
  }
  getMetadata() {
    return this.metadata ?? this.track.getMetadata();
  }
  static build(params: IBarObject) {
    return params;
  }
}
