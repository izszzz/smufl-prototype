import * as Core from "./";
import { calcFraction } from ".";

export interface IElement {
  track?: Core.Track;
  bar?: Core.Bar;
  time: Core.Time;
  fraction: number;
}
export class Element implements IElement {
  track;
  bar;
  time;
  get fraction() {
    return calcFraction(
      this.time.duration,
      this.getMetadata().timeSignature.denominator
    );
  }
  constructor({ track, time, bar }: Omit<IElement, "fraction">) {
    this.track = track;
    this.bar = bar;
    this.time = time;
  }
  getMetadata() {
    if (!this.track) throw new Error();
    return this.bar?.getMetadata() ?? this.track.getMetadata();
  }
}
