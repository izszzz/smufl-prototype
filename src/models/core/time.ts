import { Optional } from "../../helpers/utility_types/optional";

// TODO: 命名考える
interface ITime {
  start: number;
  duration: number;
  end: number;
}
export class Time implements ITime {
  start;
  duration = 0;
  end = 0;
  constructor(time: Optional<ITime, "duration">);
  constructor(time: Optional<ITime, "end">);
  constructor({ start, ...time }: Optional<ITime, "duration" | "end">) {
    this.start = start;
    if (time.end) {
      this.end = time.end;
      this.duration = time.end - start;
    }
    if (time.duration) {
      this.end = start + time.duration;
      this.duration = time.duration;
    }
  }
  static build(params: Optional<ITime, "duration">): typeof params;
  static build(params: Optional<ITime, "end">): typeof params;
  static build(params: Optional<ITime, "duration" | "end">) {
    return params;
  }
}
