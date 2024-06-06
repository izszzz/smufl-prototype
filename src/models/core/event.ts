import * as R from "remeda";

export class Event {
  start = 0;
  duration = 0;
  end = 0;
  constructor(event?: { start: number; duration: number });
  constructor(event?: { duration: number; end: number });
  constructor(event?: { start: number; end: number });
  constructor(
    event?: Partial<{ start: number; duration: number; end: number }>
  ) {
    if (!event) return;
    const { start, duration, end } = event;
    if (R.isNonNullish(start) && R.isNonNullish(duration)) {
      this.start = start;
      this.duration = duration;
      this.end = start + duration;
      return;
    }
    if (R.isNonNullish(end) && R.isNonNullish(duration)) {
      this.end = end;
      this.duration = duration;
      this.start = end - duration;
      return;
    }
    if (R.isNonNullish(end) && R.isNonNullish(start)) {
      this.start = start;
      this.end = end;
      this.setDuration(start, end);
      return;
    }
  }
  setStart(start: number) {
    this.start = start;
    this.setDuration(start, this.end);
  }
  setEnd(end: number) {
    this.end = end;
    this.setDuration(this.start, end);
  }
  setDuration(start: number, end: number) {
    this.duration = end - start;
  }
}
