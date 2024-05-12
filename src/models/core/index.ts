export * from "./element";
export * from "./bar";
export * from "./note";
export * from "./rest";
export * from "./score";
export * from "./track";
export * from "./metadata";
export * from "./time";
export * from "./link";

export const setPrevAndNext = <T extends { prev?: T; next?: T }>(
  collection: T[]
) => {
  collection.reduce<T | null>((acc, cur) => {
    if (acc) {
      cur.prev = acc;
      acc.next = cur;
    }
    return cur;
  }, null);
};

export const convertTempoToBpm = (tempo: number) =>
  Math.floor(60000000 / tempo);

export const convertTimeToSeconds = (time: number, bpm: number) =>
  (60 * time) / bpm;
