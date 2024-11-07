import * as Core from "../core";
import * as SMUFL from ".";

// TODO: clef
export class Bar extends Core.Event implements Core.Identifier {
  id;
  notes;
  track;
  masterbar!: SMUFL.MasterBar;
  get clef() {
    return this.track.clef;
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
