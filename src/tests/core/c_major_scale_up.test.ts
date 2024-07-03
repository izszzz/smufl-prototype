import Core from "../../models/core";
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
      test(".Timesignature", () =>
        expect(core.metaevents.data.Timesignature).toEqual([
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 4,
            start: 0,
            duration: 8,
            end: 8,
          }),
        ]));
      test(".Bpm", () =>
        expect(core.metaevents.data.Bpm).toEqual([
          new Core.Metaevents.Map.Bpm({
            value: 120,
            start: 0,
            duration: 8,
            end: 8,
          }),
        ]));
      test(".Keysignature", () =>
        expect(core.metaevents.data.Keysignature).toEqual([
          new Core.Metaevents.Map.Keysignature({
            tonality: false,
            accidental: 0,
            start: 0,
            duration: 8,
            end: 8,
          }),
        ]));
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(8)));
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(1));
      const track0 = core.tracks[0];
      describe("[0]", () => {
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".elements", () => {
          test("length", () => expect(track0?.elements).toHaveLength(8));
        });
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(8));
          describe("[0]", () => {
            const note = track0?.notes[0];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(60));
          });
          describe("[1]", () => {
            const note = track0?.notes[1];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(62));
          });
          describe("[2]", () => {
            const note = track0?.notes[2];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(64));
          });
          describe("[3]", () => {
            const note = track0?.notes[3];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(65));
          });
          describe("[4]", () => {
            const note = track0?.notes[4];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(67));
          });
          describe("[5]", () => {
            const note = track0?.notes[5];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(69));
          });
          describe("[6]", () => {
            const note = track0?.notes[6];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () => expect(note?.pitch).toEqual(71));
          });
          describe("[7]", () => {
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
