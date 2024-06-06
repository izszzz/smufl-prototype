import path from "path";
import { describe, expect, test } from "vitest";
import Core from "../models/core";

export const importCore = async (fileName: string) =>
  new Core.Importer(
    await import(path.join("..", "fixtures", "core", `${fileName}.json`))
  ).import();

describe("Time", () => {
  describe("Note", () => {
    test("quarter_middle_c", async () => {
      const core = await importCore("quarter_middle_c");
      expect(core.tracks[0]?.elements[0]).toMatchObject({
        start: 0,
        duration: 1,
        end: 1,
      });
    });
    test("quarter_dot_middle_c", async () => {
      const core = await importCore("quarter_dot_middle_c");
      expect(core.tracks[0]?.elements[0]).toMatchObject({
        start: 0,
        duration: 1.5,
        end: 1.5,
      });
    });
    test("8th", async () => {
      const core = await importCore("8th_middle_c");
      expect(core.tracks[0]?.elements[0]).toMatchObject({
        start: 0,
        duration: 0.5,
        end: 0.5,
      });
    });
    test("beat 4", async () => {
      const core = await importCore("beat_4");
      expect(core.tracks[0]?.elements[0]).toMatchObject({
        start: 0,
        duration: 1,
        end: 1,
      });
      expect(core.tracks[0]?.elements[1]).toMatchObject({
        start: 1,
        duration: 1,
        end: 2,
      });
      expect(core.tracks[0]?.elements[2]).toMatchObject({
        start: 2,
        duration: 1,
        end: 3,
      });
      expect(core.tracks[0]?.elements[3]).toMatchObject({
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
