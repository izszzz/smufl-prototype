import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("quarter_middle_c", async () => {
  const core = await importCore("quarter_middle_c");
  const event = { end: 1, duration: 1, start: 0 };
  describe("Score", () => {
    test("Event", () => expect(core).toMatchObject(event));
    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({ denominator: 4, numerator: 4, ...event }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([
        new Core.Bpm({ value: new Core.Unit.Bpm(120), ...event }),
      ]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({ tonality: false, accidental: 0, ...event }),
      ]));
    describe(".tracks", () => {
      test("length", () => expect(core.tracks).toHaveLength(1));
      describe("[0]", () => {
        const track0 = core.tracks[0];
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(1));
          describe("[0]", () => {
            const note0 = track0?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note0?.pitch).toEqual(new Core.Unit.Pitch(60)));
          });
        });
        test("extends Event", () => expect(track0).toMatchObject(event));
      });
    });
  });
});
