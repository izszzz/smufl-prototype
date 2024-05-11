import * as Core from "./";
interface INote extends Core.IElement {
  pitch: number;
}
interface INoteObject
  extends Omit<INote, "track" | "bar" | "time" | "fraction"> {
  track?: ReturnType<typeof Core.Track.build>;
  bar?: ReturnType<typeof Core.Bar.build>;
  time: ReturnType<typeof Core.Time.build>;
}
export class Note extends Core.Element implements INote {
  pitch;

  constructor({ pitch, track, time, bar }: Omit<INote, "fraction">) {
    super({ track, bar, time });
    this.pitch = pitch;
  }

  static build(params: INoteObject) {
    return params;
  }
}
