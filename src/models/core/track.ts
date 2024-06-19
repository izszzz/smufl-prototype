import Core, { Identifier } from ".";
import { Event } from "./event";

export class Track extends Event implements Identifier {
  id: Identifier["id"];
  elements: InstanceType<typeof Core.Element>[] = [];
  notes;
  name;
  score;
  preset;
  constructor({
    name,
    notes,
    score,
    preset,
  }: {
    name?: string;
    preset?: number;
    score: InstanceType<typeof Core.Score>;
    notes: Omit<ConstructorParameters<typeof Core.Note>[0], "track" | "id">[];
  }) {
    super();
    this.id = Core.createId(score.tracks);
    this.score = score;
    this.name = name;
    this.preset = preset ?? 54;
    this.notes = notes.map((note) => new Core.Note({ track: this, ...note }));
    this.score.tracks.push(this);
    this.setStart(Core.getEventsStart(this.elements));
    this.setEnd(Core.getEventsEnd(this.elements));
  }
}
