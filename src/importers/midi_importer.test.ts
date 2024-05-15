import fs from "fs";
import * as R from "remeda";
import { CoreImporter } from "./core_importer";
import { MidiImporter } from "./midi_importer";
import { describe, expect, test } from "vitest";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";
import eighth_rest from "../fixtures/core/8th_rest.json";
import time_signature_4_4 from "../fixtures/core/time-signature_4-4.json";
import time_signature_3_4 from "../fixtures/core/time-signature_3-4.json";
import bpm_120 from "../fixtures/core/bpm_120.json";
import bpm_140 from "../fixtures/core/bpm_140.json";
import "../extensions/buffer/to_array_buffer.extensions";

const basePath = "src/fixtures/midi/";
const importMidiFile = (path: string) => {
  console.log(Buffer.from("").toArrayBuffer);
  console.log(new Int16Array().toFloat32Array);
  return new MidiImporter(
    fs.readFileSync(basePath + path).toArrayBuffer()
  ).import();
};

describe("Note", () => {
  test("quarter middle C", () => {
    const score = importMidiFile(`quarter_middle_c.mid`);
    expect(score).toEqual(new CoreImporter(quarter_middle_c).import());
  });

  test("8th middle C", () => {
    const score = importMidiFile(`8th_middle_c.mid`);
    expect(score).toEqual(new CoreImporter(eighth_middle_c).import());
  });
});

describe("Rest", () => {
  test("quarter", () => {
    const score = importMidiFile(`quarter_rest.mid`);
    expect(score).toEqual(new CoreImporter(quarter_rest).import());
  });
  test("8th", () => {
    const score = importMidiFile(`8th_rest.mid`);
    expect(score).toEqual(new CoreImporter(eighth_rest).import());
  });
});

describe("Track", () => {
  test("export two-track", () => {
    const score = importMidiFile(`two-track.mid`);
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
    test("export 4/4 score", () => {
      const score = importMidiFile(`time-signature_4-4.mid`);
      expect(score).toEqual(new CoreImporter(time_signature_4_4).import());
    });
    test("export 3/4 score", () => {
      const score = importMidiFile(`time-signature_3-4.mid`);
      expect(score).toEqual(new CoreImporter(time_signature_3_4).import());
    });

    describe("BPM", () => {
      test("export 120 score", () => {
        const score = importMidiFile(`bpm_120.mid`);
        expect(score).toEqual(new CoreImporter(bpm_120).import());
      });
      test("export 140 score", () => {
        const score = importMidiFile(`bpm_140.mid`);
        expect(score).toEqual(new CoreImporter(bpm_140).import());
      });
    });
  });
});
