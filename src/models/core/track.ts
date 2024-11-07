import * as Core from ".";

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
  } & Core.Event) {
    super(event);
    this.id = id;
    this.name = name;
    this.preset = preset;
    this.notes = notes;
  }
}
