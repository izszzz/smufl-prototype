import { Identifier } from "../../helpers";
import * as Core from "./";

interface IBar extends Identifier, Core.ILink<Bar> {
  track: Core.Track;
  metadata?: Core.Metadata;
  elements: Core.Element[];
  time?: Core.Time;
}
interface IBarObject
  extends Omit<IBar, "track" | "metadata" | "elements" | "time"> {
  track?: ReturnType<typeof Core.Track.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>[];
  elements: ReturnType<typeof Core.Note.build>[];
  time?: ReturnType<typeof Core.Time.build>;
}

export class Bar implements IBar {
  id;
  elements;
  track;
  metadata?;
  prev?;
  next?;
  constructor({ id, track, metadata, prev, next, elements: notes }: IBar) {
    this.id = id;
    this.next = next;
    this.prev = prev;
    this.track = track;
    this.metadata = metadata;
    this.elements = notes;
  }
  getMetadata() {
    return this.metadata ?? this.track.getMetadata();
  }
  static build(params: IBarObject) {
    return params;
  }
}
