import { describe, expect, test } from "vitest";
import { checkNote, checkTimesignature, importCore } from ".";

describe("8th_rest", async () => {
  const core = await importCore("8th_rest");
  const smufl = core.toSMUFL();
  describe("Score", () => {
    describe(".timesignatures", () => {
      test(".length", () => expect(smufl.timesignatures).toHaveLength(1));
      checkTimesignature(smufl.timesignatures[0]!);
    });
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
            describe(".keysignature", () => {
              test(".glyphs", () =>
                expect(bar?.masterbar.keysignature?.glyphs).toHaveLength(0));
            });
            describe(".timesignature", () =>
              checkTimesignature(bar!.masterbar.timesignature));
          });
        });
      });
    });
    describe(".notes", () => {
      test(".length", () => expect(smufl.notes).toHaveLength(3));
      describe("[0]", () => {
        checkNote(smufl.notes[0]!, {
          fraction: 8,
          notehead: { glyphName: "noteheadBlack" },
          stem: { glyphName: "stem", type: "Up" },
          flagGlyphName: "flag8thUp",
        });
      });
      describe("[1]", () => {
        const note = smufl.notes[1];
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(note?.glyph?.glyphName).toEqual("rest8th"));
        });
        test(".fraction", () => expect(note?.fraction).toEqual(8));
      });
      describe("[2]", () => {
        const note = smufl.notes[2];
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(note?.glyph?.glyphName).toEqual("restHalf"));
        });
        test(".fraction", () => expect(note?.fraction).toEqual(2));
      });
    });
  });
});
