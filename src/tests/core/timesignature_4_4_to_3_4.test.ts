import Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("quarter_middle_c", async () => {
  const core = await importCore("timesignature_4_4_to_3_4");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 7,
        end: 7,
      }));
    describe(".metaevents", () => {
      test(".timesignature", () =>
        expect(core.metaevents.data.timesignature).toEqual([
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 4,
            duration: 4,
            start: 0,
            end: 4,
          }),
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 3,
            duration: 3,
            start: 4,
            end: 7,
          }),
        ]));
      test(".bpm", () =>
        expect(core.metaevents.data.bpm).toEqual([
          new Core.Metaevents.Map.Bpm({
            value: 120,
            duration: 7,
            start: 0,
            end: 7,
          }),
        ]));
      test(".keysignature", () =>
        expect(core.metaevents.data.keysignature).toEqual([
          new Core.Metaevents.Map.Keysignature({
            tonality: false,
            accidental: 0,
          }),
        ]));
    });
    describe(".elements", () => {
      test(".length", () => expect(core.elements).toHaveLength(7));
      describe("[0]", () => {
        test(".id", () => expect(core.elements[0]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[0]).toMatchObject({
            start: 0,
            duration: 1,
            end: 1,
          }));
      });
    });
  });
});
