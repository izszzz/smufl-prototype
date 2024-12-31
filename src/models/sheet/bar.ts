import * as Core from "core";
import * as Sheet from "sheet";

export class Bar extends Core.Event implements Core.Identifier {
  id;
  notes;
  track!: Sheet.Track;
  constructor({
    id,
    notes,

    ...event
  }: {
    id: number;
    notes: Sheet.Note[];
  } & Core.Event) {
    super(event);
    this.id = id;
    this.notes = notes;
  }
}
