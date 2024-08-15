import * as Core from "../../core";
import { Bar } from "./bar";
import { MasterBar } from "./masterbar";

declare module "../../core/element" {
  interface Element {
    bar: Bar;
  }
}
declare module "../../core/track" {
  interface Track {
    bars: Bar[];
  }
}
declare module "../../core/score" {
  interface Score {
    masterbars: InstanceType<typeof MasterBar>[];
  }
}
const { createId, getEventsEnd, getEventsStart } = Core;
export { createId, getEventsEnd, getEventsStart };
export const Note = Core.Note;
export type Note = Core.Note;
export const Importer = Core.Importer;
export type Importer = Core.Importer;
export const Track = Core.Track;
export type Track = Core.Track;
export const Metaevents = Core.Metaevents;
export type Metaevents = Core.Metaevents;
export const Event = Core.Event;
export type Event = Core.Event;
export const Element = Core.Element;
export type Element = Core.Element;
export const Score = Core.Score;
export type Score = Core.Score;
export type Identifier = Core.Identifier;
export * from "./sequence";
export * from "./beat";
export * from "./chord";
export * from "./bar";
export * from "./masterbar";
export * from "./rest";
export * from "./importer";
