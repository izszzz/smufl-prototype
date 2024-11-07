import { describe, expect, test } from "vitest";
import { checkNote, checkTimesignature, importCore } from ".";

describe("quarter_middle_c", async () => {
  const core = await importCore("quarter_middle_c");
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
    describe(".elements", () => {
      test(".length", () => expect(smufl.notes).toHaveLength(2));
      describe("[0]", () => {
        checkNote(smufl.notes[0]!, {
          notehead: { glyphName: "noteheadBlack" },
          stem: { glyphName: "stem", type: "Up" },
        });
      });
      describe("[1]", () => {
        const note = smufl.notes[1];
        test(".dot", () => expect(note?.dot).toEqual(1));
        describe(".glyph", () => {
          test(".glyphName", () =>
            expect(note?.glyph?.glyphName).toEqual("restHalf"));
        });
      });
    });
  });
});
