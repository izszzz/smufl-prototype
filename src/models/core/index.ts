import * as R from "remeda";
import { Event } from "./event";
import Metadata from "./metadata.json";

export * from "./event";
export * from "./metaevent";
export * from "./metaevents";
export * from "./element";
export * from "./note";
export * from "./track";
export * from "./score";
export * from "./importer";
export const convertTempoToBpm = (tempo: number) =>
  Math.floor(60000000 / tempo);
export const convertTimeToSeconds = (time: number, bpm: number) =>
  (60 * time) / bpm;
export const createId = (ids: Identifier[]) =>
  (R.firstBy(ids, [R.prop("id"), "desc"])?.id ?? 0) + 1;
export const getEventsStart = (events: Event[]) =>
  R.firstBy(events, [R.prop("start"), "asc"])?.start ?? 0;
export const getEventsEnd = (events: Event[]) =>
  R.firstBy(events, [R.prop("end"), "desc"])?.end ?? 0;
export interface Identifier {
  readonly id: number;
}
export { Metadata };
