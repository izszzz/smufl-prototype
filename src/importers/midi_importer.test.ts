import fs from "fs";
import * as R from "remeda";
import * as Core from "../models/core";
import { MidiImporter } from "./midi_importer";
import { describe, expect, test } from "vitest";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";

const toArrayBuffer = (buffer: Buffer) =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
const importMidiFile = (path: string) =>
  new MidiImporter(toArrayBuffer(fs.readFileSync(path))).import();
const path = "src/fixtures/midi/";

describe("Note", () => {
  test("quarter middle C", () => {
    const score = importMidiFile(`${path}quarter_middle_c.mid`);
    expect(score).toEqual(new Core.Score(quarter_middle_c));
  });

  test("8th middle C", () => {
    const score = importMidiFile(`${path}8th_middle_c.mid`);
    expect(score).toEqual(new Core.Score(eighth_middle_c));
  });
});

describe("Rest", () => {
  test("quarter_rest", () => {
    const score = importMidiFile(`${path}quarter_rest.mid`);
    expect(score).toEqual(new Core.Score(quarter_rest));
  });
});

describe("Track", () => {
  test("export two-track", () => {
    const score = importMidiFile(`${path}two-track.mid`);
    expect(score).toEqual(
      new Core.Score({
        tracks: R.times(2, () => ({
          notes: [{ pitch: 60, fraction: 4, time: { start: 0, duration: 1 } }],
        })),
      })
    );
  });
});

describe("Score Metadata", () => {
  describe("timeSig", () => {
    test("export 4/4 score", () => {
      const score = importMidiFile(`${path}time-signature_4-4.mid`);
      expect(score.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 4,
      });
    });
    test("export 3/4 score", () => {
      const score = importMidiFile(`${path}time-signature_3-4.mid`);
      expect(score.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 3,
      });
    });
  });

  describe("BPM", () => {
    test("export 120 score", () => {
      const score = importMidiFile(`${path}bpm_120.mid`);
      expect(score.metadata.bpm).toEqual(120);
    });
    test("export 140 score", () => {
      const score = importMidiFile(`${path}bpm_140.mid`);
      expect(score.metadata.bpm).toEqual(140);
    });
  });
});
