import * as SMUFL from "../models/smufl";
import { describe, expect, test } from "vitest";
import { SMUFLExporter } from "./smufl_exporter";
import { importCore } from "..//models/core/fixtures";
import Core from "../models/smufl/core";

const exportSMUFL = async (fileName: string) =>
  new SMUFLExporter(await importCore(fileName)).export();

describe("Core", () => {
  describe("Sequence", () => {
    describe("c_major_arpeggio", async () => {
      const smufl = await exportSMUFL("c_major_arpeggio");
      const beats = smufl.core.tracks[0]?.bars[0]?.sequence.beats;
      const beat = beats?.[0];
      test("Sequence.beats.length", () => {
        expect(beats?.length).toEqual(1);
      });
      test("Sequence.beats[0].element", () => {
        expect(beat?.element).instanceOf(Core.Chord);
      });
      const chord = beat?.element as InstanceType<typeof Core.Chord>;
      test("Sequence.beats[0].element.chord.length", () => {
        expect(chord.chord.length).toEqual(2);
      });
      test("Sequence.beats[0].element.chord[0]", () => {
        expect(chord.chord[0]).instanceOf(Core.Note);
      });
      test("Sequence.beats[0].element.chord[1]", () => {
        expect(chord.chord[1]).instanceOf(Core.Sequence);
      });
      const sequence = chord.chord[1] as InstanceType<typeof Core.Sequence>;
      test("Sequence.beats[0].element.chord[1].beats.length", () => {
        expect(sequence.beats.length).toEqual(2);
      });
    });
  });
  describe("Fraction", () => {
    test("quarter_rest", async () => {
      const smufl = await exportSMUFL("quarter_rest");
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(4);
    });
    test("8th_rest", async () => {
      const smufl = await exportSMUFL("8th_rest");
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(8);
    });
  });
});
describe("Note", () => {
  describe("Fraction", () => {
    test("quarter", async () => {
      const smufl = await exportSMUFL("quarter_middle_c");
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(4);
    });
    test("quarter dot", async () => {
      const smufl = await exportSMUFL("quarter_dot_middle_c");
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(4);
    });
    test("8th", async () => {
      const smufl = await exportSMUFL("8th_middle_c");
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(8);
    });
  });
  describe("quarter_middle_c", async () => {
    const smufl = await exportSMUFL("quarter_middle_c");
    test("Note.fraction", () => {
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .fraction
      ).toEqual(4);
    });
    test("Note.accessory.middle.length", () => {
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .accessory?.middle.length
      ).toEqual(1);
    });
    test("Note.accessory.glyphs.columns[0].length", () => {
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .accessory?.glyphGrid.columns[0]?.glyphs.length
      ).toEqual(2);
    });
    test("Note.accessory.target.glypnName", () => {
      expect(
        (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
          .accessory?.target?.glyphName
      ).toEqual("noteQuarterUp");
    });
  });
  test("8th_middle_c", async () => {
    const smufl = await exportSMUFL("8th_middle_c");
    expect(
      (smufl.tracks[0]?.bars[0].sequence.beats[0]?.element as SMUFL.Element)
        .accessory?.target?.glyphName
    ).toEqual("note8thUp");
  });
});
describe("Rest", () => {
  test("quarter_rest", async () => {
    const smufl = await exportSMUFL("quarter_rest");
    expect(
      (smufl.tracks[0]?.bars[0].sequence.beats[1]?.element as SMUFL.Element)
        .accessory?.target?.glyphName
    ).toEqual("restQuarter");
  });
});
