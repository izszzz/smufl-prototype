import Core, { Identifier } from ".";
import { Event } from "./event";

export class Track extends Event implements Identifier {
  id;
  elements: InstanceType<typeof Core.Element>[] = [];
  notes: InstanceType<typeof Core.Note>[] = [];
  name;
  score;
  preset;
  constructor({
    name,
    notes,
    score,
    preset,
    ...event
  }: {
    name?: string;
    preset: number;
    score: InstanceType<typeof Core.Score>;
    notes: Omit<ConstructorParameters<typeof Core.Note>[0], "track" | "id">[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = Core.createId(score.tracks);
    this.score = score;
    this.name = name;
    this.preset = preset;
    for (const note of notes) new Core.Note({ track: this, ...note });
    this.score.tracks.push(this);
  }
}
