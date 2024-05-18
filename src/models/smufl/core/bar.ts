import { Identifier } from "../../../helpers";
import * as Core from "../../core";

interface IBar extends Identifier {
  track: Core.Track;
  metadata?: Core.Metadata;
  elements: Core.Element[];
  time?: Core.Time;
}
interface Constructor extends Omit<IBar, "metadata" | "time"> {
  metadata?: ReturnType<typeof Core.Metadata.build>;
  time?: ReturnType<typeof Core.Time.build>;
}

export class Bar implements IBar {
  id;
  elements;
  track;
  metadata?;
  constructor({ id, track, metadata, elements }: Constructor) {
    this.id = id;
    this.track = track;
    if (metadata) this.metadata = new Core.Metadata(metadata);
    this.elements = elements;
  }
  getMetadata() {
    return this.metadata ?? this.track.getMetadata();
  }
}
