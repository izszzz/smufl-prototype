import { Clef, NoteType, Rest } from "src/const/musicxml/4.0/musicxml";
import { P, match } from "ts-pattern";
import * as SMUFL from "smufl";

export class Glyph<T extends keyof SMUFL.Glyphnames> {
  bBox;
  advancedWidth;
  glyphName;
  anchor;
  get codepoint() {
    return parseInt(
      SMUFL.Glyphnames[this.glyphName].codepoint.replace("U+", ""),
      16
    );
  }
  constructor(glyphName: T) {
    this.bBox = new SMUFL.BBox(SMUFL.getBBox(glyphName));
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.anchor = SMUFL.getAnchor(glyphName);
    this.glyphName = glyphName;
  }
  static find(
    type: keyof SMUFL.Ranges,
    predicate: (glyph: SMUFL.Ranges[typeof type]["glyphs"][number]) => boolean
  ) {
    return new Glyph(SMUFL.Ranges[type].glyphs.find(predicate)!);
  }
  static findClef(clef: Clef) {
    const glyphName = match(clef.$$.sign?.[0]?._)
      .with("G", () => "gClef" as const)
      .with("F", () => "fClef" as const)
      .with("C", () => "cClef" as const)
      .with("percussion", () => "unpitchedPercussionClef1" as const)
      .with("TAB", () => "6stringTabClef" as const)
      .with(P.union("none", "jianpu"), () => {})
      .otherwise(() => {});
    if (glyphName) return new Glyph(glyphName);
  }

  static findRest(rest: Rest, type: NoteType) {
    if (rest.$?.measure === "yes") return new Glyph("restWhole");
    const glyphName = match(type._)
      .with("quarter", () => "restQuarter" as const)
      .with("eighth", () => "rest8th" as const)
      .with("16th", () => "rest16th" as const)
      .with("half", () => "restHalf" as const)
      .with("whole", () => "restWhole" as const)
      .otherwise(() => {});
    if (glyphName) return new Glyph(glyphName);
  }

  static findNotehead(type: NoteType) {
    const glyphName = match(type._)
      .with(
        P.union("quarter", "eighth", "16th"),
        () => "noteheadBlack" as const
      )
      .with("half", () => "noteheadHalf" as const)
      .with("whole", () => "noteheadWhole" as const)
      .otherwise(() => {});
    if (glyphName) return new Glyph(glyphName);
  }
}
