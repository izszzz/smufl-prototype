import Core from "..";
import { describe, expect, test } from "vitest";
import { importCore } from ".";
describe("beat_4", async () => {
  const core = await importCore("beat_4");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 4,
        end: 4,
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
      test(".length", () => expect(core.elements).toHaveLength(4));
      describe("Element[0]", () => {
        test(".id", () => expect(core.elements[0]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[0]).toMatchObject({
            start: 0,
            duration: 1,
            end: 1,
          }));
      });
      describe("Element[1]", () => {
        test(".id", () => expect(core.elements[1]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[1]).toMatchObject({
            start: 1,
            duration: 1,
            end: 2,
          }));
      });
      describe("Element[2]", () => {
        test(".id", () => expect(core.elements[2]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[2]).toMatchObject({
            start: 2,
            duration: 1,
            end: 3,
          }));
      });
      describe("Element[3]", () => {
        test(".id", () => expect(core.elements[3]?.id).toBeTypeOf("number"));
        test("extends Event", () =>
          expect(core.elements[3]).toMatchObject({
            start: 3,
            duration: 1,
            end: 4,
          }));
      });
    });
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(1));
      const track0 = core.tracks[0];
      describe("Track[0]", () => {
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".elements", () => {
          test("length", () => expect(track0?.elements).toHaveLength(4));
        });
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(4));
          describe("Note[0]", () => {
            const note0 = track0?.notes[0];
            test(".id", () => expect(note0?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () =>
          expect(track0).toMatchObject({
            start: 0,
            duration: 4,
            end: 4,
          }));
      });
    });
  });
});
