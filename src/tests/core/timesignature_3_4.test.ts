import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("timesignature_3_4", async () => {
  const core = await importCore("timesignature_3_4");
  const event = { end: 0, duration: 0, start: 0 };
  describe("Score", () => {
    test("Event", () => expect(core).toMatchObject(event));
    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({ denominator: 4, numerator: 3, ...event }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([new Core.Bpm({ value: 120, ...event })]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({ tonality: false, accidental: 0, ...event }),
      ]));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
