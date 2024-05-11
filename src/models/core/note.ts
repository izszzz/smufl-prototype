import * as Core from "./";
import { calcFraction } from ".";
interface INote extends Core.ILink<Note[]> {
  pitch: number;
  track?: Core.Track;
  bar?: Core.Bar;
  time: Core.Time;
  fraction: number;
}
interface INoteObject
  extends Omit<INote, "track" | "bar" | "time" | "fraction"> {
  track?: ReturnType<typeof Core.Track.build>;
  bar?: ReturnType<typeof Core.Bar.build>;
  time: ReturnType<typeof Core.Time.build>;
}
export class Note implements INote {
  pitch;
  track;
  bar;
  time;
  get fraction() {
    return calcFraction(
      this.time.duration,
      this.getMetadata().timeSignature.denominator
    );
  }
  next?: Note[];
  prev?: Note[];
  constructor({ pitch, track, time, bar }: Omit<INote, "fraction">) {
    this.pitch = pitch;
    this.track = track;
    this.bar = bar;
    this.time = time;
  }
  getMetadata() {
    if (!this.track) throw new Error();
    return this.bar?.getMetadata() ?? this.track.getMetadata();
  }

  static build(params: INoteObject) {
    return params;
  }
}
