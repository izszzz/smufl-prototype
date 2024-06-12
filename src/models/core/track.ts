import * as R from "remeda";
import Core from ".";
import { Identifier } from "../../helpers";
import { Event } from "./event";

export class Track extends Event implements Identifier {
  id: number;
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
    this.id = (R.firstBy(score.tracks, [R.prop("id"), "desc"])?.id ?? 0) + 1;
    this.score = score;
    this.name = name;
    this.preset = preset ?? 54;
    this.notes = notes.map((note) => new Core.Note({ track: this, ...note }));
    this.setStart(
      R.firstBy(this.elements, [R.prop("start"), "asc"])?.start ?? 0
    );
    this.setEnd(R.firstBy(this.elements, [R.prop("end"), "desc"])?.end ?? 0);
    this.score.tracks = [...this.score.tracks, this];
  }
}
