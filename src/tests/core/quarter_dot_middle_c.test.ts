import * as Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("quarter_dot_middle_c", async () => {
  const core = await importCore("quarter_dot_middle_c");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 1.5,
        end: 1.5,
      }));
    test(".timesignatures", () =>
      expect(core.timesignatures).toEqual([
        new Core.Timesignature({
          denominator: 4,
          numerator: 4,
          start: 0,
          end: 1.5,
          duration: 1.5,
        }),
      ]));
    test(".bpms", () =>
      expect(core.bpms).toEqual([
        new Core.Bpm({
          value: 120,
          start: 0,
          duration: 1.5,
          end: 1.5,
        }),
      ]));
    test(".keysignatures", () =>
      expect(core.keysignatures).toEqual([
        new Core.Keysignature({
          tonality: false,
          accidental: 0,
          start: 0,
          duration: 1.5,
          end: 1.5,
        }),
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
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () =>
          expect(track0).toMatchObject({
            start: 0,
            duration: 1.5,
            end: 1.5,
          }));
      });
    });
  });
});
