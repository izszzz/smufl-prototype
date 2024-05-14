import * as Core from "./";
import Metadata from "../../consts/metadata.json";

export interface IElement {
  track: Core.Track;
  bar?: Core.Bar;
  time: Core.Time;
  fraction: number;
  dot: boolean;
}
interface IElementConstructor
  extends Omit<IElement, "time" | "fraction" | "dot"> {
  time: Parameters<typeof Core.Time.build>[0];
}
export class Element implements IElement {
  track;
  bar;
  time;
  dot;
  fraction;
  constructor({ track, time, bar }: IElementConstructor) {
    this.track = track;
    this.bar = bar;
    this.time = new Core.Time(time);
    const fraction = this.calcFraction(
      this.time.duration,
      this.getMetadata().timeSignature.denominator
    );
    this.dot = this.isDot(fraction);
    this.fraction = this.dot
      ? this.calcFraction(
          this.time.duration / 1.5,
          this.getMetadata().timeSignature.denominator
        )
      : fraction;
  }
  getMetadata() {
    return this.bar?.getMetadata() ?? this.track.getMetadata();
  }
  calcFraction(duration: number, denominator: number) {
    return denominator * (1 / duration);
  }
  isDot(fraction: number) {
    return !Metadata.fractions.find((f) => f.value === fraction);
  }
}
