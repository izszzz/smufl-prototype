import * as Core from "core";

export class Track extends Core.Event {
  readonly id;
  name;
  preset;
  score!: Core.Score;
  get notes() {
    return this.score.notes.filter((note) => note.trackId === this.id);
  }
  constructor({
    id,
    name,
    preset,
    ...event
  }: {
    id: number;
    name?: string;
    preset: Core.Unit.Preset;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.name = name;
    this.preset = preset;
  }
}
