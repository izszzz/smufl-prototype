import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("c_minor", async () => {
  const core = await importCore("c_minor");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 0,
        end: 0,
      }));
    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({
          denominator: 4,
          numerator: 4,
          start: 0,
          end: 0,
          duration: 0,
        }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([
        new Core.Bpm({
          value: new Core.Unit.Bpm(120),
          start: 0,
          duration: 0,
          end: 0,
        }),
      ]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({
          tonality: true,
          accidental: -3,
          start: 0,
          duration: 0,
          end: 0,
        }),
      ]));
    describe(".tracks", () =>
      test("length", () => expect(core.tracks).toHaveLength(0)));
  });
});
