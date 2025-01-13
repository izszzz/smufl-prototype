import * as Core from "core";
import { describe, expect, test } from "vitest";
import { importCore } from ".";

describe("c_minor_scale_up", async () => {
  const core = await importCore("c_minor_scale_up");
  const event = { end: 8, duration: 8, start: 0 };
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
        new Core.Keysignature({ tonality: true, accidental: -3, ...event }),
      ]));
    describe(".tracks", () => {
      test(".length", () => expect(core.tracks).toHaveLength(1));
      const track0 = core.tracks[0];
      describe("[0]", () => {
        test(".id", () => expect(track0?.id).toBeTypeOf("number"));
        describe(".notes", () => {
          test("length", () => expect(track0?.notes).toHaveLength(8));
          describe("[0]", () => {
            const note = track0?.notes[0];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(60)));
          });
          describe("[1]", () => {
            const note = track0?.notes[1];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(62)));
          });
          describe("[2]", () => {
            const note = track0?.notes[2];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(64)));
          });
          describe("[3]", () => {
            const note = track0?.notes[3];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(65)));
          });
          describe("[4]", () => {
            const note = track0?.notes[4];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(67)));
          });
          describe("[5]", () => {
            const note = track0?.notes[5];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(69)));
          });
          describe("[6]", () => {
            const note = track0?.notes[6];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(71)));
          });
          describe("[7]", () => {
            const note = track0?.notes[7];
            test(".id", () => expect(note?.id).toBeTypeOf("number"));
            test(".pitch", () =>
              expect(note?.pitch).toEqual(new Core.Unit.Pitch(72)));
          });
        });
        test("extends Event", () => expect(track0).toMatchObject(event));
      });
    });
  });
});
