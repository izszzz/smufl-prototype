import { Event } from "./event";
import { Element } from "./element";
import { Note } from "./note";
import { Score } from "./score";
import { Track } from "./track";
import { Metadata } from "./metadata";
import { Importer } from "./importer";

export interface CoreConstructor {
  new (): void;
  Element: typeof Element;
  Note: typeof Note;
  Score: typeof Score;
  Track: typeof Track;
  Metadata: typeof Metadata;
  Event: typeof Event;
  Importer: typeof Importer;
  convertTimeToSeconds(time: number, bpm: number): number;
  convertTempoToBpm(tempo: number): number;
}

// TODO:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CoreClass: CoreConstructor = class Core {
  static Element = Element;
  static Note = Note;
  static Score = Score;
  static Track = Track;
  static Metadata = Metadata;
  static Event = Event;
  static Importer = Importer;
  static convertTempoToBpm = (tempo: number) => Math.floor(60000000 / tempo);
  static convertTimeToSeconds = (time: number, bpm: number) =>
    (60 * time) / bpm;
};
export default CoreClass;
