import path from "path";
import { describe, expect, test } from "vitest";
import { CoreImporter } from "./core_importer";

export const importCore = async (fileName: string) =>
  new CoreImporter(
    await import(
      path.join(
        "..",
        "fixtures",
        "core",
        // TODO:
        // `${expect.getState().currentTestName ?? ""}.json`
        `${fileName}.json`
      )
    )
  ).import();

describe("Note", () => {
  describe("Fraction", () => {
    test("quarter", async () => {
      const core = await importCore("quarter_middle_c");
      expect(core.tracks[0].notes[0].fraction).toEqual(4);
    });
    test("quarter dot", async () => {
      const core = await importCore("quarter_dot_middle_c");
      expect(core.tracks[0].notes[0].fraction).toEqual(4);
      expect(core.tracks[0].notes[0].dot).toEqual(true);
    });
    test("8th", async () => {
      const core = await importCore("8th_middle_c");
      expect(core.tracks[0].notes[0].fraction).toEqual(8);
    });
  });
  describe("Link", () => {
    describe("prev", () => {
      test("beat 4", async () => {
        const core = await importCore("beat_4");
        expect(core.tracks[0].notes[0].prev).toEqual([]);
        expect(core.tracks[0].notes[1].prev).toEqual([core.tracks[0].notes[0]]);
        expect(core.tracks[0].notes[2].prev).toEqual([core.tracks[0].notes[1]]);
        expect(core.tracks[0].notes[3].prev).toEqual([core.tracks[0].notes[2]]);
      });
    });
    describe("next", () => {
      test("beat 4", async () => {
        const core = await importCore("beat_4");
        expect(core.tracks[0].notes[0].next).toEqual([core.tracks[0].notes[1]]);
        expect(core.tracks[0].notes[1].next).toEqual([core.tracks[0].notes[2]]);
        expect(core.tracks[0].notes[2].next).toEqual([core.tracks[0].notes[3]]);
        expect(core.tracks[0].notes[3].next).toEqual([]);
      });
    });
  });
});

describe("Time", () => {
  describe("Note", () => {
    test("quarter", async () => {
      const core = await importCore("quarter_middle_c");
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 1,
        end: 1,
      });
    });
    test("quarter dot", async () => {
      const core = await importCore("quarter_dot_middle_c");
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 1.5,
        end: 1.5,
      });
    });
    test("8th", async () => {
      const core = await importCore("8th_middle_c");
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 0.5,
        end: 0.5,
      });
    });
    test("beat 4", async () => {
      const core = await importCore("beat_4");
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 1,
        end: 1,
      });
      expect(core.tracks[0].notes[1].time).toEqual({
        start: 1,
        duration: 1,
        end: 2,
      });
      expect(core.tracks[0].notes[2].time).toEqual({
        start: 2,
        duration: 1,
        end: 3,
      });
      expect(core.tracks[0].notes[3].time).toEqual({
        start: 3,
        duration: 1,
        end: 4,
      });
    });
  });
});

describe("Metadata", () => {
  describe("timeSignature", () => {
    test("4/4", async () => {
      const core = await importCore("timesignature_4_4");
      expect(core.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 4,
      });
    });
    test("3/4", async () => {
      const core = await importCore("timesignature_3_4");
      expect(core.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 3,
      });
    });
  });
  describe("bpm", () => {
    test("120", async () => {
      const core = await importCore("bpm_120");
      expect(core.metadata.bpm).toEqual(120);
    });
    test("140", async () => {
      const core = await importCore("bpm_140");
      expect(core.metadata.bpm).toEqual(140);
    });
  });
});
