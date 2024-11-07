import path from "path";
import * as Core from "../../models/core";
import * as SMUFL from "../../models/tsmufl";
import "../../models/tsmufl/extensions/core";
import { describe, expect, test } from "vitest";

export const importCore = async (fileName: string) =>
  Core.create(
    await import(path.join("..", "..", "fixtures", "core", `${fileName}.json`))
  ).toSMUFL();
export const checkTimesignature = (
  timesignature: SMUFL.Timesignature,
  {
    numeratorGlyphname = "timeSig4",
    denominatorGlyphname = "timeSig4",
  }: {
    numeratorGlyphname?: SMUFL.Timesignature["numeratorGlyph"]["glyphName"];
    denominatorGlyphname?: SMUFL.Timesignature["denominatorGlyph"]["glyphName"];
  } = {
    numeratorGlyphname: "timeSig4",
    denominatorGlyphname: "timeSig4",
  }
) => {
  describe(".timesignature", () => {
    test(".numeratorGlyph", () =>
      expect(timesignature.numeratorGlyph.glyphName).toEqual(
        numeratorGlyphname
      ));
    test(".denominatorGlyph", () =>
      expect(timesignature.denominatorGlyph.glyphName).toEqual(
        denominatorGlyphname
      ));
  });
};
export const checkNote = (
  note: SMUFL.Note,
  {
    dot = 0,
    fraction = 4,
    notehead,
    stem,
    flagGlyphName,
  }: {
    fraction?: SMUFL.Note["fraction"];
    dot?: SMUFL.Note["dot"];
    notehead: {
      glyphName: NonNullable<SMUFL.Note["notehead"]>["glyph"]["glyphName"];
    } | null;
    stem: {
      type: NonNullable<SMUFL.Note["stem"]>["type"];
      glyphName: NonNullable<SMUFL.Note["stem"]>["glyph"]["glyphName"];
    } | null;
    flagGlyphName?: NonNullable<SMUFL.Note["flag"]>["glyphName"];
  }
) => {
  test(".dot", () => expect(note?.dot).toEqual(dot));
  test(".fraction", () => expect(note?.fraction).toEqual(fraction));
  describe(".notehead", () => {
    if (notehead === null) expect(note.notehead).toEqual(notehead);
    else {
      test(".glyphName", () =>
        expect(note?.notehead?.glyph.glyphName).toEqual(notehead.glyphName));
    }
  });
  describe(".stem", () => {
    if (stem === null) expect(note.stem).toEqual(stem);
    else {
      test(".type", () => expect(note.stem?.type).toEqual(stem.type));
      test(".glyphName", () =>
        expect(note.stem?.glyph.glyphName).toEqual(stem.glyphName));
    }
  });
  describe(".flagGlyph", () => {
    test(".glyphName", () =>
      expect(note?.flag?.glyphName).toEqual(flagGlyphName));
  });
};
