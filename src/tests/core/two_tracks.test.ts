import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("two_tracks", async () => {
  const core = await importCore("two_tracks");
  const event = { end: 1, duration: 1, start: 0 };
  describe("Score", () => {
    test("Event", () => expect(core).toMatchObject(event));

    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({ denominator: 4, numerator: 4, ...event }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([new Core.Bpm({ value: 120, ...event })]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({ tonality: false, accidental: 0, ...event }),
      ]));
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(2));
      describe("[0]", () => {
        const track0 = core.tracks[0];
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(1));
          describe("[0]", () => {
            const note0 = track0?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () => expect(track0).toMatchObject(event));
      });
      describe("[1]", () => {
        const track1 = core.tracks[1];
        test(".id", () => expect(track1?.id).toBeTypeOf("number"));
        describe(".notes", () => {
          test("length", () => expect(track1?.notes).toHaveLength(1));
          describe("[0]", () => {
            const note0 = track1?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () => expect(track1).toMatchObject(event));
      });
    });
  });
});
