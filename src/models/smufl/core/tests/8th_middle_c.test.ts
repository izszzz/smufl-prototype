import Core from "..";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("8th_middle_c", async () => {
  const core = await importCore("8th_middle_c");
  describe("Score", () => {
    const { masterbars, tracks } = core;
    const masterbar0 = masterbars[0];
    describe(".masterbars", () => {
      test(".length", () => expect(masterbars).toHaveLength(1));
      describe("[0]", () => {
        const bars = masterbar0?.bars;
        describe(".bars", () => {
          test(".length", () => expect(bars).toHaveLength(1));
        });
        describe("[0]", () => {
          const bar0 = masterbar0?.bars[0];
          test(".id", () => expect(bar0?.id).toEqual(1));
        });
      });
    });
    describe(".tracks", () => {
      const track0 = tracks[0];
      test(".length", () => expect(tracks).toHaveLength(1));
      describe("[0]", () => {
        const bars = track0?.bars;
        describe(".bars", () => {
          test(".length", () => expect(bars).toHaveLength(1));
          describe("[0]", () => {
            const bar0 = track0?.bars[0];
            test(".id", () => expect(bar0?.id).toEqual(1));
            describe(".elements", () => {
              test(".length", () => expect(bar0?.elements).toHaveLength(2));
            });
          });
        });
      });
    });
    describe(".elements", () => {
      test(".length", () => expect(core?.elements).toHaveLength(2));
      describe("[0]", () => {
        const element0 = core.elements[0];
        test(".id", () => expect(element0?.id).toBeTypeOf("number"));
        test("instanceof", () => expect(element0).toBeInstanceOf(Core.Note));
        test("extends Event", () =>
          expect(element0).toMatchObject({
            start: 0,
            duration: 0.5,
            end: 0.5,
          }));
      });
      describe("[1]", () => {
        const element1 = core.elements[1];
        test(".id", () => expect(element1?.id).toBeTypeOf("number"));
        test("instanceof", () => expect(element1).toBeInstanceOf(Core.Rest));
        test("extends Event", () =>
          expect(element1).toMatchObject({
            start: 0.5,
            duration: 3.5,
            end: 4,
          }));
      });
    });
  });
});
