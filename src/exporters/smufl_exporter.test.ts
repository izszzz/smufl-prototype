import { describe, expect, test } from "vitest";
import { SMUFLExporter } from "./smufl_exporter";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";
import eighth_rest from "../fixtures/core/8th_rest.json";
import { CoreImporter } from "../importers/core_importer";

describe("Core", () => {
  describe("Rest", () => {
    describe("Fraction", () => {
      test("quarter", () => {
        const core = new CoreImporter(quarter_rest).import();
        expect(core.tracks[0].notes[0].fraction).toEqual(4);
      });
      test("8th", () => {
        const core = new CoreImporter(eighth_rest).import();
        expect(core.tracks[0].notes[0].fraction).toEqual(8);
      });
    });
    describe("Time", () => {
      test("quarter", () => {
        const smufl = new SMUFLExporter(
          new CoreImporter(quarter_rest).import()
        ).export();
        expect(smufl.tracks[0].core.elements[0].time).toEqual({
          duration: 1,
          end: 1,
          start: 0,
        });
        expect(smufl.tracks[0].core.elements[1].time).toEqual({
          duration: 1,
          end: 2,
          start: 1,
        });
      });
    });
  });
});
describe("Note", () => {
  test("quarter middle C", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(quarter_middle_c).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "noteQuarterUp"
    );
  });
  test("8th middle C", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(eighth_middle_c).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "note8thUp"
    );
  });
});
describe("Rest", () => {
  test("export quarter Rest", () => {
    const smufl = new SMUFLExporter(
      new CoreImporter(quarter_rest).import()
    ).export();
    expect(smufl.tracks[0].bars[0].elements[0].glyph.glyphName).toEqual(
      "restQuarter"
    );
  });
});
