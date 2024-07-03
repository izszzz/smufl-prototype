import * as R from "remeda";
import { Event } from "./event";
import { Element } from "./element";
import { Note } from "./note";
import { Score } from "./score";
import { Track } from "./track";
import { Importer } from "./importer";
import { Metaevent } from "./metaevent";
import { Metaevents } from "./metaevents";
import Metadata from "./metadata.json";

export interface CoreConstructor {
  new (): void;
  Element: typeof Element;
  Note: typeof Note;
  Score: typeof Score;
  Track: typeof Track;
  Metaevent: typeof Metaevent;
  Metaevents: typeof Metaevents;
  Event: typeof Event;
  Importer: typeof Importer;
  Metadata: Metadata;
  convertTimeToSeconds(time: number, bpm: number): number;
  convertTempoToBpm(tempo: number): number;
  createId(ids: Identifier[]): number;
  getEventsStart(events: Event[]): number;
  getEventsEnd(events: Event[]): number;
}

// TODO:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CoreClass: CoreConstructor = class Core {
  static Event = Event;
  static Element = Element;
  static Note = Note;
  static Score = Score;
  static Track = Track;
  static Metaevents = Metaevents;
  static Importer = Importer;
  static Metadata = Metadata;
  static convertTempoToBpm = (tempo: number) => Math.floor(60000000 / tempo);
  static convertTimeToSeconds = (time: number, bpm: number) =>
    (60 * time) / bpm;
  static createId = (ids: Identifier[]) =>
    (R.firstBy(ids, [R.prop("id"), "desc"])?.id ?? 0) + 1;
  static getEventsStart = (events: Event[]) =>
    R.firstBy(events, [R.prop("start"), "asc"])?.start ?? 0;
  static getEventsEnd = (events: Event[]) =>
    R.firstBy(events, [R.prop("end"), "desc"])?.end ?? 0;
};
export default CoreClass;

export interface Identifier {
  readonly id: number;
}
