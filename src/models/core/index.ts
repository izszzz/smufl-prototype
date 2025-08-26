import Metadata from "./metadata.json";

export * from "./event";
export * from "./track";
export * from "./note";
export * from "./timesignature";
export * from "./keysignature";
export * from "./tempo";
export * from "./score";
export * as Unit from "./unit";

export enum Tonality {
  Major,
  Minor,
}
export { Metadata };
