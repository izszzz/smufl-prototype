import * as Core from "./";
interface INote extends Core.IElement {
  pitch: number;
}
interface Constructor extends Omit<INote, "time" | "fraction" | "dot"> {
  time: ReturnType<typeof Core.Time.build>;
}
interface Build extends Omit<Constructor, "track"> {}
export class Note extends Core.Element implements INote {
  pitch;
  constructor({ pitch, ...element }: Constructor) {
    super(element);
    this.pitch = pitch;
  }

  static build(params: Build) {
    return params;
  }
}
