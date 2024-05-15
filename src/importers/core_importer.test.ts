import { describe, expect, test } from "vitest";
import { CoreImporter } from "./core_importer";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import quarter_dot_middle_c from "../fixtures/core/quarter_dot_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
// TODO: SMUFLに移動
// import quarter_rest from "../fixtures/core/quarter_rest.json";
// import eighth_rest from "../fixtures/core/8th_rest.json";
import time_signature_4_4 from "../fixtures/core/time-signature_4-4.json";
import time_signature_3_4 from "../fixtures/core/time-signature_3-4.json";
import bpm_120 from "../fixtures/core/bpm_120.json";
import bpm_140 from "../fixtures/core/bpm_140.json";
import beat_4 from "../fixtures/core/beat_4.json";

describe("Note", () => {
  describe("Fraction", () => {
    test("quarter", () => {
      const core = new CoreImporter(quarter_middle_c).import();
      expect(core.tracks[0].notes[0].fraction).toEqual(4);
    });
    test("quarter dot", () => {
      const core = new CoreImporter(quarter_dot_middle_c).import();
      expect(core.tracks[0].notes[0].fraction).toEqual(4);
      expect(core.tracks[0].notes[0].dot).toEqual(true);
    });
    test("8th", () => {
      const core = new CoreImporter(eighth_middle_c).import();
      expect(core.tracks[0].notes[0].fraction).toEqual(8);
    });
  });
  describe("Link", () => {
    describe("prev", () => {
      test("beat 4", () => {
        const core = new CoreImporter(beat_4).import();
        expect(core.tracks[0].notes[0].prev).toEqual([]);
        expect(core.tracks[0].notes[1].prev).toEqual([core.tracks[0].notes[0]]);
        expect(core.tracks[0].notes[2].prev).toEqual([core.tracks[0].notes[1]]);
        expect(core.tracks[0].notes[3].prev).toEqual([core.tracks[0].notes[2]]);
      });
    });
    describe("next", () => {
      test("beat 4", () => {
        const core = new CoreImporter(beat_4).import();
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
    test("quarter", () => {
      const core = new CoreImporter(quarter_middle_c).import();
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 1,
        end: 1,
      });
    });
    test("quarter dot", () => {
      const core = new CoreImporter(quarter_dot_middle_c).import();
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 1.5,
        end: 1.5,
      });
    });
    test("8th", () => {
      const core = new CoreImporter(eighth_middle_c).import();
      expect(core.tracks[0].notes[0].time).toEqual({
        start: 0,
        duration: 0.5,
        end: 0.5,
      });
    });
    test("beat 4", () => {
      const core = new CoreImporter(beat_4).import();
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
    test("4/4", () => {
      const core = new CoreImporter(time_signature_4_4).import();
      expect(core.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 4,
      });
    });
    test("3/4", () => {
      const core = new CoreImporter(time_signature_3_4).import();
      expect(core.metadata.timeSignature).toEqual({
        denominator: 4,
        numerator: 3,
      });
    });
  });
  describe("bpm", () => {
    test("120", () => {
      const core = new CoreImporter(bpm_120).import();
      expect(core.metadata.bpm).toEqual(120);
    });
    test("140", () => {
      const core = new CoreImporter(bpm_140).import();
      expect(core.metadata.bpm).toEqual(140);
    });
  });
});
