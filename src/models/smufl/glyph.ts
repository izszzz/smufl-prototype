import { Barline, Clef, NoteType, Rest } from "src/const/musicxml/4.0/musicxml";
import { P, match } from "ts-pattern";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import { BoundingBox } from "../boundingbox";

export class Glyph<
  T extends keyof SMUFL.Glyphnames = keyof SMUFL.Glyphnames,
> extends Sheet.Glyph {
  boundingBox;
  advancedWidth;
  glyphName;
  anchor;
  dx;
  get codepoint() {
    return parseInt(
      SMUFL.Glyphnames[this.glyphName].codepoint.replace("U+", ""),
      16
    );
  }
  constructor(
    type: Sheet.Glyph["type"],
    line: Sheet.Glyph["line"],
    glyphName: T,
    advanced: boolean
  ) {
    super(type, line);
    const { bBoxNE, bBoxSW } = SMUFL.getBoundingBox(glyphName);
    this.boundingBox = new BoundingBox(
      bBoxSW[0],
      bBoxNE[1],
      bBoxNE[0] - bBoxSW[0],
      bBoxNE[1] - bBoxSW[1]
    );
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.anchor = SMUFL.getAnchor(glyphName);
    this.glyphName = glyphName;
    this.width = this.boundingBox.width;
    this.dx = advanced ? this.advancedWidth : 0;
    if (advanced) this.width += this.advancedWidth;
  }
  static find(
    type: keyof SMUFL.Ranges,
    predicate: (glyph: SMUFL.Ranges[typeof type]["glyphs"][number]) => boolean
  ) {
    return SMUFL.Ranges[type].glyphs.find(predicate)!;
  }

  static findClef(clef: Clef) {
    return match(clef.$$.sign?.[0]?._)
      .with("G", () => "gClef" as const)
      .with("F", () => "fClef" as const)
      .with("C", () => "cClef" as const)
      .with("percussion", () => "unpitchedPercussionClef1" as const)
      .with("TAB", () => "6stringTabClef" as const)
      .with(P.union("none", "jianpu"), () => {})
      .exhaustive();
  }

  static findRest(rest: Rest, type: NoteType) {
    if (rest.$?.measure === "yes") return "restWhole";
    return match(type._)
      .with("quarter", () => "restQuarter" as const)
      .with("eighth", () => "rest8th" as const)
      .with("16th", () => "rest16th" as const)
      .with("half", () => "restHalf" as const)
      .with("whole", () => "restWhole" as const)
      .exhaustive();
  }

  static findNotehead(type: NoteType) {
    return match(type._)
      .with(
        P.union("quarter", "eighth", "16th"),
        () => "noteheadBlack" as const
      )
      .with("half", () => "noteheadHalf" as const)
      .with("whole", () => "noteheadWhole" as const)
      .exhaustive();
  }

  static findBarline(type: Barline) {
    return match(type.$$["bar-style"]?.[0]?._)
      .with("light-heavy", () => "barlineFinal" as const)
      .with("regular", () => "barlineSingle" as const)
      .exhaustive();
  }
}
