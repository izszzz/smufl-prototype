import * as R from "remeda";

export class Event {
  start = 0;
  duration = 0;
  end = 0;
  constructor(
    event?: Partial<{ start: number; duration: number; end: number }>
  ) {
    if (!event) return;
    if (R.isNonNullish(event.start) && R.isNonNullish(event.duration)) {
      this.start = event.start;
      this.duration = event.duration;
      this.end = event.start + event.duration;
    }
    if (R.isNonNullish(event.end) && R.isNonNullish(event.duration)) {
      this.end = event.end;
      this.duration = event.duration;
      this.start = event.end - event.duration;
    }
    if (R.isNonNullish(event.end) && R.isNonNullish(event.start)) {
      this.start = event.start;
      this.end = event.end;
      this.setDuration(event.start, event.end);
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
