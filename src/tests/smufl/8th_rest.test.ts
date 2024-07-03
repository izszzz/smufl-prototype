import { describe, expect, test } from "vitest";
import { importCore } from ".";
import * as SMUFL from "../../models/smufl";

describe("8th_rest", async () => {
  const core = await importCore("8th_rest");
  const smufl = new SMUFL.Exporter(core).export();
  describe("Score", () => {
    test(".core", () => expect(smufl.core).toEqual(core));
    describe(".tracks", () => {
      test(".length", () => expect(smufl.tracks).toHaveLength(1));
      describe("[0]", () => {
        const track = smufl.tracks[0];
        describe(".bars", () => {
          test(".length", () => expect(track?.bars).toHaveLength(1));
        });
      });
    });
    describe(".masterbars", () => {
      test(".length", () => expect(smufl.masterbars).toHaveLength(1));
      describe("[0]", () => {
        const masterbar = smufl.masterbars[0];
        describe(".bars", () => {
          test(".length", () => expect(masterbar?.bars).toHaveLength(1));
          describe("[0]", () => {
            const bar = masterbar?.bars[0];
            describe(".Keysignature", () => {
              test(".glyphs", () =>
                expect(bar?.keysignature?.glyphs).toHaveLength(0));
            });
            describe(".Timesignature", () => {
              test(".glyphs", () =>
                expect(bar?.timesignature?.glyphs).toHaveLength(2));
            });
          });
        });
      });
    });
    describe(".rows", () => {
      test(".length", () => expect(smufl.rows).toHaveLength(1));
      describe("[0]", () => {
        const row = smufl.rows[0];
        describe(".bars", () => {
          test(".length", () => expect(row?.masterBars).toHaveLength(1));
        });
      });
    });
    describe(".elements", () => {
      test(".length", () => expect(smufl.elements).toHaveLength(3));
      describe("[0]", () => {
        const element = smufl.elements[0];
        test("instanceof", () => expect(element).instanceOf(SMUFL.Note));
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(element?.glyph?.glyphName).toEqual("note8thUp"));
        });
        test(".fraction", () => expect(element?.fraction).toEqual(8));
      });
      describe("[1]", () => {
        const element = smufl.elements[1];
        test("instanceof", () => expect(element).instanceOf(SMUFL.Rest));
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(element?.glyph?.glyphName).toEqual("rest8th"));
        });
        test(".fraction", () => expect(element?.fraction).toEqual(8));
      });
      describe("[2]", () => {
        const element = smufl.elements[2];
        test("instanceof", () => expect(element).instanceOf(SMUFL.Rest));
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(element?.glyph?.glyphName).toEqual("restHalf"));
        });
        test(".fraction", () => expect(element?.fraction).toEqual(2));
      });
    });
  });
});
