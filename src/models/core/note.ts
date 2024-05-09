import * as Core from "./";
import { calcFraction } from ".";
interface INote extends Core.ILink<Note[]> {
  pitch: number;
  track: Core.Track;
  bar: Core.Bar;
  time: Core.Time;
  fraction: number;
}
export class Note implements INote {
  pitch;
  track;
  bar;
  time;
  fraction;
  next?: Note[];
  prev?: Note[];
  constructor({
    pitch,
    track,
    time,
    bar,
  }: Omit<INote, "time" | "fraction"> & {
    time: Core.Time | ConstructorParameters<typeof Core.Time>[0];
  }) {
    this.pitch = pitch;
    this.track = track;
    this.bar = bar;
    this.time = time instanceof Core.Time ? time : new Core.Time(time);
    this.fraction = calcFraction(
      this.time.duration,
      bar.getMetadata().timeSignature.denominator
    );
  }

  static build(
    params: Omit<INote, "fraction" | "bar" | "track" | "time"> & {
      time: Core.Time | ConstructorParameters<typeof Core.Time>[0];
    }
  ) {
    return params;
  }
}
