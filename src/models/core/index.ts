import { Event } from "./event";
import { Element } from "./element";
import { Note } from "./note";
import { Score } from "./score";
import { Track } from "./track";
import { Importer } from "./importer";
import { Metaevent } from "./metaevent";
import { Metaevents } from "./metaevents";

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
  convertTimeToSeconds(time: number, bpm: number): number;
  convertTempoToBpm(tempo: number): number;
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
  static convertTempoToBpm = (tempo: number) => Math.floor(60000000 / tempo);
  static convertTimeToSeconds = (time: number, bpm: number) =>
    (60 * time) / bpm;
};
export default CoreClass;
