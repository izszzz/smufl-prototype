import * as Core from "core";

export class Track<Note extends Core.Note = Core.Note>
  extends Core.Event
  implements Core.Identifier
{
  id;
  notes;
  name;
  preset;
  constructor({
    id,
    name,
    notes,
    preset,
    ...event
  }: {
    id: number;
    name?: string;
    preset: number;
    notes: Note[];
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.name = name;
    this.preset = preset;
    this.notes = notes;
  }
}
