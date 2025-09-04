import { match, P } from "ts-pattern";
import { Beat } from "./units/beat";

export class Event {
  start;
  duration;
  end;
  get params() {
    return {
      start: this.start.value,
      duration: this.duration.value,
      end: this.end.value,
    };
  }
  constructor(event: { start: Beat; end: Beat });
  constructor(event: { start: Beat; duration: Beat });
  constructor(event: { end: Beat; duration: Beat });
  constructor(event: { start?: Beat; duration?: Beat; end?: Beat }); // avoid broken ConstructorParameters
  constructor(event: { start?: Beat; duration?: Beat; end?: Beat }) {
    const { start, duration, end } = match(event)
      .with(
        { start: P.nonNullable, duration: P.nonNullable, end: P.nonNullable },
        (params) => ({
          start: params.start,
          duration: params.duration,
          end: params.end,
        })
      )
      .with({ start: P.nonNullable, end: P.nonNullable }, (params) => ({
        start: params.start,
        duration: params.end.subtract(params.start),
        end: params.end,
      }))
      .with({ start: P.nonNullable, duration: P.nonNullable }, (params) => ({
        start: params.start,
        duration: params.duration,
        end: params.start.add(params.duration),
      }))
      .with({ duration: P.nonNullable, end: P.nonNullable }, (params) => ({
        start: params.end.subtract(params.duration),
        duration: params.duration,
        end: params.end,
      }))
      .otherwise(() => {
        throw new Error("Invalid parameter");
      });
    this.start = start;
    this.duration = duration;
    this.end = end;
  }
  setStart(start: Beat) {
    this.start = start;
    this.duration = this.end.subtract(this.start);
  }
  setEnd(end: Beat) {
    this.end = end;
    this.duration = this.end.subtract(this.start);
  }
  isOverflow(event: Event) {
    return (
      this.start.value < event.start.value || this.end.value > event.end.value
    );
  }
  isOverlapped(event: Event) {
    return this.start.value < event.end.value && this.end.value > event.start.value;
  }
}
