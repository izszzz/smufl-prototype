import { Optional } from "../../helpers/utility_types/optional";
import * as R from "remeda";

// TODO: 命名考える
interface ITime {
  start: number;
  duration: number;
  end: number;
}
export class Time implements ITime {
  start = 0;
  duration = 0;
  end = 0;
  constructor(time: Optional<ITime, "start">);
  constructor(time: Optional<ITime, "duration">);
  constructor(time: Optional<ITime, "end">);
  constructor(time: Optional<ITime, "duration" | "end" | "start">) {
    if (R.isNonNullish(time.start) && R.isNonNullish(time.duration)) {
      this.start = time.start;
      this.duration = time.duration;
      this.end = time.start + time.duration;
    }
    if (R.isNonNullish(time.end) && R.isNonNullish(time.duration)) {
      this.end = time.end;
      this.duration = time.duration;
      this.start = time.end - time.duration;
    }
    if (R.isNonNullish(time.end) && R.isNonNullish(time.start)) {
      this.start = time.start;
      this.end = time.end;
      this.duration = time.end - time.start;
    }
  }
  static build(params: Optional<ITime, "start">): typeof params;
  static build(params: Optional<ITime, "duration">): typeof params;
  static build(params: Optional<ITime, "end">): typeof params;
  static build(params: Optional<ITime, "start" | "duration" | "end">) {
    return params;
  }
}
