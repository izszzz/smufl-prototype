import * as Core from "core";

export * from "./masterbar";
export * from "./bar";
export * from "./stave";
export * from "./score";
export * from "./track";
export * from "./bpm";
export * from "./keysignature";
export * from "./timesignature";
export * from "./note";

declare module "core" {
  interface Note {
    pitch: Core.Unit.Pitch | null;
  }
}
