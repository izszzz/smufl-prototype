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
    describe(".metadata", () => {
      test(".bpm", () => {
        expect(core.metadata.bpm).toEqual(120);
      });
      test(".timeSignature", () => {
        expect(core.metadata.timeSignature).toEqual({
          denominator: 4,
          numerator: 3,
        });
      });
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(0)));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
