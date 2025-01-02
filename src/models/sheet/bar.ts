import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  notes;
  track!: Sheet.Track;
  timesignature;
  clef = new SMUFL.Glyph("gClef");
  constructor({
    id,
    notes,
    timesignature,
    ...event
  }: {
    id: number;
    notes: Sheet.Note[];
    timesignature: Sheet.Timesignature;
  } & Core.Event) {
    super(event);
    this.id = id;
    this.notes = notes;
    this.timesignature = timesignature;
  }
}
