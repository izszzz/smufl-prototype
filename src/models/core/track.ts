import * as Core from "core";

export class Track extends Core.Event {
  readonly id;
  name;
  preset;
  score!: Core.Score;
  get notes() {
    return this.score.notes.filter((note) => note.trackId === this.id);
  }
  override get params() {
    return {
      ...super.params,
      id: this.id,
      name: this.name,
      preset: this.preset.value,
    };
  }

  constructor({
    id,
    name = "",
    preset,
    ...event
  }: {
    id: number;
    name?: string;
    preset: Core.Unit.Preset;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = id;
    this.name = name;
    this.preset = preset;
  }
}
