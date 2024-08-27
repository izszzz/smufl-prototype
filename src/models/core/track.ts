import * as Core from ".";

export class Track extends Core.Event implements Core.Identifier {
  id;
  elements: Core.Element[] = [];
  notes: Core.Note[] = [];
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
    score: Core.Score;
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
