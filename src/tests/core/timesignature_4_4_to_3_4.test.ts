import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("quarter_middle_c", async () => {
  const core = await importCore("timesignature_4_4_to_3_4");
  const event = { end: 7, duration: 7, start: 0 };
  const { start, end } = event;
  describe("Score", () => {
    test("Event", () => expect(core).toMatchObject(event));
    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({
          denominator: 4,
          numerator: 4,
          duration: 4,
          start,
          end: 4,
        }),
        new Core.Timesignature({
          denominator: 4,
          numerator: 3,
          duration: 3,
          start: 4,
          end,
        }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([new Core.Bpm({ value: 120, ...event })]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({ tonality: false, accidental: 0, ...event }),
      ]));
  });
});
