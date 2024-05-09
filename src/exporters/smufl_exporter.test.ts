import { describe, expect, test } from "vitest";
import * as Core from "../models/core";
import { SMUFLExporter } from "./smufl_exporter";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";
describe("Note", () => {
  test("export quarter middle C Core.Note", () => {
    const smufl = new SMUFLExporter(new Core.Score(quarter_middle_c)).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "noteQuarterUp"
    );
  });
  describe("Rest", () => {
    test("export quarter Rest", () => {
      const smufl = new SMUFLExporter(new Core.Score(quarter_rest)).export();
      expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
        "restQuarter"
      );
    });
  });
});
