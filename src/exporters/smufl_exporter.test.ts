import { describe, expect, test } from "vitest";
import { SMUFLExporter } from "./smufl_exporter";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";
import { CoreImporter } from "../importers/core_importer";
describe("Note", () => {
  test("quarter middle C", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(quarter_middle_c, {
        generate: { bar: true, rest: true },
      }).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "noteQuarterUp"
    );
  });
  test("8th middle C", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(eighth_middle_c, {
        generate: { bar: true, rest: true },
      }).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "note8thUp"
    );
  });
});
describe("Rest", () => {
  test("export quarter Rest", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(quarter_rest, {
        generate: { bar: true, rest: true },
      }).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "restQuarter"
    );
  });
});
