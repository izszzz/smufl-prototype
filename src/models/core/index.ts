import Metadata from "./metadata.json";

export * from "./event";
export * from "./track";
export * from "./note";
export * from "./timesignature";
export * from "./keysignature";
export * from "./bpm";
export * from "./score";
export * from "./create";
export * from "./pitch";
export * as Unit from "./unit";

export const convertTimeToSeconds = (time: number, bpm: number) =>
  (60 * time) / bpm;
export enum Tonality {
  Major,
  Minor,
}
export { Metadata };
