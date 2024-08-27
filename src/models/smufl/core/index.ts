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
export {
  Score,
  Metaevents,
  Track,
  Note,
  Event,
  Element,
  Metadata,
  createId,
  getEventsEnd,
  getEventsStart,
} from "../../core";
export type { Identifier } from "../../core";
export * from "./sequence";
export * from "./beat";
export * from "./chord";
export * from "./bar";
export * from "./masterbar";
export * from "./rest";
export * from "./importer";
