import { describe, expect, test } from "vitest";
import { importCore } from ".";
describe("c_major_scale_up", async () => {
  const core = await importCore("c_major_scale_up");
  describe("Score", () => {
    describe(".masterbars", () => {
      const { masterbars } = core;
      test(".length", () => expect(masterbars).toHaveLength(2));
      describe("[0]", () => {
        const masterbar0 = masterbars[0];
        describe(".bars", () => {
          test(".length", () => expect(masterbar0?.bars).toHaveLength(1));
        });
        describe("[0]", () => {
          const bar0 = masterbar0?.bars[0];
          test(".id", () => expect(bar0?.id).toEqual(1));
        });
      });
      describe("[1]", () => {
        const masterbar1 = masterbars[1];
        describe(".bars", () => {
          test(".length", () => expect(masterbar1?.bars).toHaveLength(1));
        });
        describe("[0]", () => {
          const bar0 = masterbar1?.bars[0];
          test(".id", () => expect(bar0?.id).toEqual(2));
        });
      });
    });
    describe(".tracks", () => {
      test("length", () => expect(core.tracks).toHaveLength(1));
      describe("[0]", () => {
        describe(".bars", () => {
          const track0 = core.tracks[0];
          test(".length", () => expect(track0?.bars).toHaveLength(2));
        });
      });
    });
  });
});
