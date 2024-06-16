import path from "path";
import fs from "fs";
import { MidiImporter } from "./midi_importer";
import { describe, expect, test } from "vitest";
import { importCore } from "../models/core/tests";

const importMidi = (fileName: string) =>
  new MidiImporter(
    fs
      .readFileSync(path.join("src", "fixtures", "midi", `${fileName}.mid`))
      .toArrayBuffer()
  ).import();

describe("Note", () => {
  test("quarter_middle_c", async () => {
    const score = importMidi(`quarter_middle_c`);
    expect(score).toEqual(await importCore("quarter_middle_c"));
  });

  test("8th_middle_c", async () => {
    const score = importMidi(`8th_middle_c`);
    expect(score).toEqual(await importCore("8th_middle_c"));
  });
  test("chord", async () => {
    const score = importMidi("chord");
    expect(score).toEqual(await importCore("chord"));
  });
});

describe("Rest", () => {
  test("quarter_rest", async () => {
    const score = importMidi(`quarter_rest`);
    expect(score).toEqual(await importCore("quarter_rest"));
  });
  test("8th_rest", async () => {
    const score = importMidi(`8th_rest`);
    expect(score).toEqual(await importCore("8th_rest"));
  });
});

describe("Track", () => {
  test("export two-tracks", async () => {
    const score = importMidi(`two_tracks`);
    expect(score).toEqual(await importCore("two_tracks"));
  });
});

describe("Score Metadata", () => {
  describe("timeSig", () => {
    test("timesignature_4_4", async () => {
      const score = importMidi(`timesignature_4_4`);
      expect(score).toEqual(await importCore("timesignature_4_4"));
    });
    test("timesignature_3_4", async () => {
      const score = importMidi(`timesignature_3_4`);
      expect(score).toEqual(await importCore("timesignature_3_4"));
    });
    // test("timesignature_4_4_to_3_4", async () => {
    //   const score = importMidi(`timesignature_4_4_to_3_4`);
    //   expect(score).toEqual(await importCore("timesignature_4_4_to_3_4"));
    // });
  });
  describe("BPM", () => {
    test("bpm_120", async () => {
      const score = importMidi(`bpm_120`);
      expect(score).toEqual(await importCore("bpm_120"));
    });
    test("bpm_140", async () => {
      const score = importMidi(`bpm_140`);
      expect(score).toEqual(await importCore("bpm_140"));
    });
  });
});
