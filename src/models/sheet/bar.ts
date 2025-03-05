import * as Core from "core";
import * as Sheet from "sheet";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  width;
  staffLines;
  notes;
  staves;
  timesignature;
  track!: Sheet.Track;
  constructor({
    id,
    width,
    staffLines,
    notes,
    staves,
    timesignature,
    ...event
  }: {
    id: number;
    width: number;
    staffLines: number;
    notes: Sheet.Note[];
    staves: Sheet.Stave[];
    timesignature: Sheet.Timesignature;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.width = width;
    this.staffLines = staffLines;
    this.staves = staves;
    this.notes = notes;
    this.timesignature = timesignature;
  }
}
