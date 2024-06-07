import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("bpm_120", async () => {
  const core = await importCore("bpm_120");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 0,
        end: 0,
      }));
    describe(".metadata", () => {
      test(".bpm", () => expect(core.metadata.bpm).toEqual(120));
      test(".timeSignature", () => {
        expect(core.metadata.timeSignature).toEqual({
          denominator: 4,
          numerator: 4,
        });
      });
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(0)));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
