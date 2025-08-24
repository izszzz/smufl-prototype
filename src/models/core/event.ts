import { match, P } from "ts-pattern";

export class Event {
  start;
  duration;
  end;
  get params() {
    return {
      start: this.start,
      duration: this.duration,
      end: this.end,
    };
  }

  constructor(event: { start: number; end: number });
  constructor(event: { start: number; duration: number });
  constructor(event: { end: number; duration: number });
  constructor(event: { start?: number; duration?: number; end?: number }); // avoid broken ConstructorParameters
  constructor(event: { start?: number; duration?: number; end?: number }) {
    const { start, duration, end } = match(event)
      .with({ start: P.nonNullable, end: P.nonNullable }, (params) => ({
        start: params.start,
        duration: params.end - params.start,
        end: params.end,
      }))
      .with({ start: P.nonNullable, duration: P.nonNullable }, (params) => ({
        start: params.start,
        duration: params.duration,
        end: params.start + params.duration,
      }))
      .with({ duration: P.nonNullable, end: P.nonNullable }, (params) => ({
        start: params.end - params.duration,
        duration: params.duration,
        end: params.end,
      }))
      .otherwise(() => {
        throw new Error();
      });
    this.start = start;
    this.duration = duration;
    this.end = end;
  }
  isOverflow(event: Event) {
    return this.start < event.start || this.end > event.end;
  }
  isOverlapped(event: Event) {
    return (
      (this.start >= event.start && this.start < event.end) ||
      (this.end > event.start && this.end <= event.end) ||
      (this.start <= event.start && this.end >= event.end)
    );
  }
}
