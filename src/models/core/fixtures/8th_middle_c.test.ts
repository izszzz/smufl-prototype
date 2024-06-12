import Core from "..";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("8th_middle_c", async () => {
  const core = await importCore("8th_middle_c");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 0.5,
        end: 0.5,
      }));
    describe(".metaevents", () => {
      describe(".events", () => {
        test(".timesignature", () =>
          expect(core.metaevents.events).toContainEqual(
            new Core.Metaevents.Map.Timesignature({
              denominator: 4,
              numerator: 4,
            })
          ));
        test(".bpm", () =>
          expect(core.metaevents.events).toContainEqual(
            new Core.Metaevents.Map.Bpm({ value: 120 })
          ));
      });
    });
    describe(".elements", () => {
      test(".length", () => expect(core.elements).toHaveLength(1));
      const element0 = core.elements[0];
      describe("Element[0]", () => {
        test(".id", () => expect(element0?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(element0).toMatchObject({
            start: 0,
            duration: 0.5,
            end: 0.5,
          }));
      });
    });
    describe(".tracks", () => {
      test("length", () => expect(core.tracks).toHaveLength(1));
      describe("Track[0]", () => {
        const track0 = core.tracks[0];
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".elements", () => {
          test("length", () => expect(core.elements).toHaveLength(1));
        });
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(1));
          describe("Note[0]", () => {
            const note0 = track0?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () =>
          expect(track0).toMatchObject({
            start: 0,
            duration: 0.5,
            end: 0.5,
          }));
      });
    });
  });
});
