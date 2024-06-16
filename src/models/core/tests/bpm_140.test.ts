import Core from "..";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("bpm_140", async () => {
  const core = await importCore("bpm_140");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 0,
        end: 0,
      }));
    describe(".metaevents", () => {
      describe(".events", () => {
        test(".timesignature", () =>
          expect(core.metaevents.timesignature).toEqual([
            new Core.Metaevents.Map.Timesignature({
              denominator: 4,
              numerator: 4,
              start: 0,
              duration: 0,
              end: 0,
            }),
          ]));
        test(".bpm", () =>
          expect(core.metaevents.bpm).toEqual([
            new Core.Metaevents.Map.Bpm({
              value: 140,
              start: 0,
              duration: 0,
              end: 0,
            }),
          ]));
      });
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(0)));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
