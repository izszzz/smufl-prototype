import * as R from "remeda";
import * as SMUFL from "./";

export class Staff {
  static getStaffGlyph = (
    width: number,
    lineCount: SMUFL.Metadatas["staffLines"][number] = 5
  ): SMUFL.Glyph => {
    const glyph = R.pipe(
      SMUFL.Ranges.staves.glyphs,
      R.filter((staff) => staff.includes(`staff${lineCount}Line`)),
      R.map.strict((key) => ({
        key,
        width: SMUFL.BravuraMetadata.glyphAdvanceWidths[key],
      })),
      R.filter(({ width: staveWidth }) => width <= staveWidth),
      R.unique(),
      R.firstBy([R.prop("width"), "asc"])
    );
    if (!glyph) throw new Error();
    return new SMUFL.Glyph({ glyphName: glyph.key });
  };
}
