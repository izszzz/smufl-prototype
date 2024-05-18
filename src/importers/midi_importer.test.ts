import path from "path";
import fs from "fs";
import * as R from "remeda";
import { CoreImporter } from "./core_importer";
import { MidiImporter } from "./midi_importer";
import { describe, expect, test } from "vitest";
import { importCore } from "./core_importer.test";

const importMidi = (fileName: string) => {
  return new MidiImporter(
    fs
      .readFileSync(
        path.join(
          "src",
          "fixtures",
          "midi",
          // TODO:
          // `${expect.getState().currentTestName ?? ""}.json`
          `${fileName}.mid`
        )
      )
      .toArrayBuffer()
  ).import();
};

describe("Note", () => {
  test("quarter_middle_c", async () => {
    const score = importMidi(`quarter_middle_c`);
    expect(score).toEqual(await importCore("quarter_middle_c"));
  });

  test("8th_middle_c", async () => {
    const score = importMidi(`8th_middle_c`);
    expect(score).toEqual(await importCore("8th_middle_c"));
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
  test("export two-track", () => {
    const score = importMidi(`two-track`);
    expect(score).toEqual(
      new CoreImporter({
        tracks: R.times(2, () => ({
          notes: [{ pitch: 60, fraction: 4, time: { start: 0, duration: 1 } }],
        })),
      }).import()
    );
  });
});

describe("Score Metadata", () => {
  describe("timeSig", () => {
    test("export 4/4 score", async () => {
      const score = importMidi(`timesignature_4_4`);
      expect(score).toEqual(await importCore("timesignature_4_4"));
    });
    test("export 3/4 score", async () => {
      const score = importMidi(`timesignature_3_4`);
      expect(score).toEqual(await importCore("timesignature_3_4"));
    });

    describe("BPM", () => {
      test("export 120 score", async () => {
        const score = importMidi(`bpm_120`);
        expect(score).toEqual(await importCore("bpm_120"));
      });
      test("export 140 score", async () => {
        const score = importMidi(`bpm_140`);
        expect(score).toEqual(await importCore("bpm_140"));
      });
    });
  });
});
