import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("timesignature_3_4", async () => {
  const core = await importCore("timesignature_3_4");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 0,
        end: 0,
      }));
    describe(".metaevents", () => {
      test(".Timesignature", () =>
        expect(core.metaevents.data.Timesignature).toEqual([
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 3,
            start: 0,
            duration: 0,
            end: 0,
          }),
        ]));
      test(".Bpm", () =>
        expect(core.metaevents.data.Bpm).toEqual([
          new Core.Metaevents.Map.Bpm({
            value: 120,
            start: 0,
            duration: 0,
            end: 0,
          }),
        ]));
      test(".Keysignature", () =>
        expect(core.metaevents.data.Keysignature).toEqual([
          new Core.Metaevents.Map.Keysignature({
            tonality: false,
            accidental: 0,
            start: 0,
            duration: 0,
            end: 0,
          }),
        ]));
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(0)));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
