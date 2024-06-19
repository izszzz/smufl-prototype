import Core from "../../models/core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("two_tracks", async () => {
  const core = await importCore("two_tracks");
  describe("Score", () => {
    test("Event", () =>
      expect(core).toMatchObject({
        start: 0,
        duration: 1,
        end: 1,
      }));
    describe(".metaevents", () => {
      test(".timesignature", () =>
        expect(core.metaevents.data.timesignature).toEqual([
          new Core.Metaevents.Map.Timesignature({
            denominator: 4,
            numerator: 4,
            start: 0,
            duration: 1,
            end: 1,
          }),
        ]));
      test(".bpm", () =>
        expect(core.metaevents.data.bpm).toEqual([
          new Core.Metaevents.Map.Bpm({
            value: 120,
            start: 0,
            duration: 1,
            end: 1,
          }),
        ]));
      test(".keysignature", () =>
        expect(core.metaevents.data.keysignature).toEqual([
          new Core.Metaevents.Map.Keysignature({
            tonality: false,
            accidental: 0,
          }),
        ]));
    });
    describe(".elements", () =>
      test(".length", () => expect(core.elements).toHaveLength(2)));
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(2));
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
            test(".pitch", () => expect(note0?.pitch).toEqual(60));
          });
        });
        test("extends Event", () =>
          expect(track0).toMatchObject({
            start: 0,
            duration: 1,
            end: 1,
          }));
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
        test("extends Event", () =>
          expect(track1).toMatchObject({
            start: 0,
            duration: 1,
            end: 1,
          }));
      });
    });
  });
});
