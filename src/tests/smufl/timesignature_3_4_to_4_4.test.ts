import { describe, expect, test } from "vitest";
import { checkTimesignature, importCore } from ".";
describe("timesignature_4_4_to_3_4", async () => {
  const core = await importCore("timesignature_4_4_to_3_4");
  const smufl = core.toSMUFL();
  describe("Score", () => {
    describe(".timesignatures", () => {
      test(".length", () => expect(smufl.timesignatures).toHaveLength(2));
      checkTimesignature(smufl.timesignatures[0]!);
      checkTimesignature(smufl.timesignatures[1]!, {
        numeratorGlyphname: "timeSig3",
      });
    });
    describe(".tracks", () =>
      test(".length", () => expect(smufl.tracks).toHaveLength(1)));
    describe(".masterbars", () => {
      test(".length", () => expect(smufl.masterbars).toHaveLength(2));
    });
  });
});
