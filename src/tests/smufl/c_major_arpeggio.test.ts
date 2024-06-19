import { describe, expect, test } from "vitest";
import { importCore } from ".";
import * as SMUFL from "../../models/smufl";
import Core from "../../models/smufl/core";

describe("c_major_arpeggio", async () => {
  const core = await importCore("c_major_arpeggio");
  const smufl = new SMUFL.Exporter(core).export();
  describe("Sequence", () => {
    describe("c_major_arpeggio", async () => {
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
});
