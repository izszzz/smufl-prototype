import * as Core from "core";
import * as Sheet from "sheet";
import { Type } from "../files/mxl/schema";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  width;
  staffLines;
  notes;
  track!: Sheet.Track;
  timesignature;
  clefs;
  barlines;
  constructor({
    id,
    width,
    staffLines,
    clefs,
    notes,
    timesignature,
    barlines,
    ...event
  }: {
    id: number;
    width: number;
    staffLines: number;
    clefs: Type.Clef[];
    barlines: Type.Barline[];
    notes: Sheet.Note[];
    timesignature: Sheet.Timesignature;
  } & Core.Event) {
    super(event);
    this.id = id;
    this.width = width;
    this.staffLines = staffLines;
    this.clefs = clefs;
    this.notes = notes;
    this.timesignature = timesignature;
    this.barlines = barlines;
  }
}
