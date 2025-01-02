import { describe, expect, test } from "vitest";
import { checkTimesignature, importCore } from ".";
describe("timesignature_3_4", async () => {
  const core = await importCore("timesignature_3_4");
  const smufl = core.toSMUFL();
  describe("Score", () => {
    describe(".timesignatures", () => {
      test(".length", () => expect(smufl.timesignatures).toHaveLength(1));
      checkTimesignature(smufl.timesignatures[0]!, {
        numeratorGlyphname: "timeSig3",
      });
    });
    describe(".tracks", () =>
      test(".length", () => expect(smufl.tracks).toHaveLength(0)));
    describe(".masterbars", () => {
      test(".length", () => expect(smufl.masterbars).toHaveLength(0));
    });
  });
});
