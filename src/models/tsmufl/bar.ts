import * as Core from "core";
import * as SMUFL from "smufl";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  notes;
  track;
  masterbar!: SMUFL.MasterBar;
  get attributes() {
    return new SMUFL.Attributes(this);
  }

  constructor({
    id,
    notes,
    track,
    ...event
  }: {
    id: number;
    notes: SMUFL.Note[];
    track: SMUFL.Track;
  } & Core.Event) {
    super(event);
    this.id = id;
    this.notes = notes;
    this.track = track;
  }
}
