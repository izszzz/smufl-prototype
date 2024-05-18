import { describe, expect, test } from "vitest";
import { SMUFLExporter } from "./smufl_exporter";
import { importCore } from "../importers/core_importer.test";

const exportSMUFL = async (fileName: string) =>
  new SMUFLExporter(await importCore(fileName)).export();

describe("Core", () => {
  describe("Fraction", () => {
    test("quarter_rest", async () => {
      const core = await importCore("quarter_rest");
      expect(core.tracks[0].notes[0].fraction).toEqual(4);
    });
    test("8th_rest", async () => {
      const core = await importCore("8th_rest");
      expect(core.tracks[0].notes[0].fraction).toEqual(8);
    });
  });
  describe("Time", () => {
    test("quarter_rest", async () => {
      const smufl = await exportSMUFL("quarter_rest");
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
describe("Note", () => {
  test("quarter_middle_c", async () => {
    const smufl = await exportSMUFL("quarter_middle_c");
    expect(
      smufl.tracks[0].bars[0].elements[0].accessory.target.glyphName
    ).toEqual("noteQuarterUp");
  });
  test("8th_middle_c", async () => {
    const smufl = await exportSMUFL("8th_middle_c");
    expect(
      smufl.tracks[0].bars[0].elements[0].accessory.target.glyphName
    ).toEqual("note8thUp");
  });
});
describe("Rest", () => {
  test("quarter_rest", async () => {
    const smufl = await exportSMUFL("quarter_rest");
    expect(
      smufl.tracks[0].bars[0].elements[0].accessory.target.glyphName
    ).toEqual("restQuarter");
  });
});
