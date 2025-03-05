export class Event {
  start;
  duration;
  end;
  constructor(params: StartEnd);
  constructor(params: StartDuration);
  constructor(params: StartEnd | StartDuration) {
    if ("duration" in params) {
      const { start, duration } = params;
      this.start = start;
      this.duration = duration;
      this.end = start + duration;
    } else {
      const { start, end } = params;
      this.start = start;
      this.end = end;
      this.duration = end - start;
    }
  }
}
// export type EventConstructorParameter = ConstructorParameters<typeof Event>[0];
export type EventConstructorParameter = StartEnd | StartDuration;
type StartEnd = { start: number; end: number };
type StartDuration = { start: number; duration: number };
