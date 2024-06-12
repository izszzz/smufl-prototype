import Core from "..";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("c_major_scale_up", async () => {
  const core = await importCore("c_major_scale_up");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 8,
        end: 8,
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
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(8)));
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(1));
      const track0 = core.tracks[0];
      describe("Track[0]", () => {
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".elements", () => {
          test("length", () => expect(track0?.elements).toHaveLength(8));
        });
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(8));
          describe("Note[0]", () => {
            const note = track0?.notes[0];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(60));
          });
          describe("Note[1]", () => {
            const note = track0?.notes[1];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(62));
          });
          describe("Note[2]", () => {
            const note = track0?.notes[2];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(64));
          });
          describe("Note[3]", () => {
            const note = track0?.notes[3];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(65));
          });
          describe("Note[4]", () => {
            const note = track0?.notes[4];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(67));
          });
          describe("Note[5]", () => {
            const note = track0?.notes[5];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(69));
          });
          describe("Note[6]", () => {
            const note = track0?.notes[6];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(71));
          });
          describe("Note[7]", () => {
            const note = track0?.notes[7];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(72));
          });
        });
        test("extends Event", () =>
          expect(track0).toMatchObject({
            start: 0,
            duration: 8,
            end: 8,
          }));
      });
    });
  });
});
