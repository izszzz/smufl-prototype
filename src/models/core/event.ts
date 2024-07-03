export class Event {
  start;
  duration;
  end;
  constructor({
    start,
    duration,
    end,
  }: {
    start: number;
    duration: number;
    end: number;
  }) {
    this.start = start;
    this.duration = duration;
    this.end = end;
  }
}
