import Core from "../../models/core";
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
    describe(".metaevents", () => {
      test(".Timesignature", () =>
        expect(core.metaevents.data.Timesignature).toEqual([
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 4,
            start: 0,
            duration: 1.5,
            end: 1.5,
          }),
        ]));
      test(".Bpm", () =>
        expect(core.metaevents.data.Bpm).toEqual([
          new Core.Metaevents.Map.Bpm({
            value: 120,
            start: 0,
            duration: 1.5,
            end: 1.5,
          }),
        ]));
      test(".Keysignature", () =>
        expect(core.metaevents.data.Keysignature).toEqual([
          new Core.Metaevents.Map.Keysignature({
            tonality: false,
            accidental: 0,
            start: 0,
            duration: 1.5,
            end: 1.5,
          }),
        ]));
    });
    describe(".elements", () => {
      test(".length", () => expect(core.elements).toHaveLength(1));
      describe("[0]", () => {
        test(".id", () => expect(core.elements[0]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[0]).toMatchObject({
            start: 0,
            duration: 1.5,
            end: 1.5,
          }));
      });
    });
    describe(".tracks", () => {
      test("length", () => expect(core.tracks).toHaveLength(1));
      describe("[0]", () => {
        const track0 = core.tracks[0];
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".elements", () => {
          test("length", () => expect(track0?.elements).toHaveLength(1));
        });
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(1));
          describe("[0]", () => {
            const note0 = track0?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note0?.originalPitch).toEqual(60));
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
