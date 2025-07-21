import Metadatas from "./metadata.json";
import BravuraMetadata from "../../const/bravura/bravura_metadata.json";
import Glyphnames from "../../const/smufl/glyphnames.json";
import Ranges from "../../const/smufl/ranges.json";
import { Clef, NoteType, Rest } from "src/const/musicxml/4.0/musicxml";
import { Glyph } from "./glyph";
import { P, match } from "ts-pattern";

export * from "./bbox";
export * from "./glyph";
export * from "./score";
export * from "./note";
export * from "./stave";
export * from "./bar";
export * from "./masterbar";
export * from "./row";
export * from "./group";
export * from "./text";

export { Metadatas, Ranges, Glyphnames, BravuraMetadata };

export const getBBox = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphBBoxes[
    glyphName as keyof BravuraMetadata["glyphBBoxes"]
  ];
export const getAdvanceWidth = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphAdvanceWidths[
    glyphName as keyof BravuraMetadata["glyphAdvanceWidths"]
  ];
export const getAnchor = <T extends keyof Glyphnames>(glyphName: T) =>
  BravuraMetadata.glyphsWithAnchors[
    glyphName as keyof BravuraMetadata["glyphsWithAnchors"]
  ];

export function findClef(clef: Clef) {
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

export function findRest(rest: Rest, type: NoteType) {
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

export function findNotehead(type: NoteType) {
  const glyphName = match(type._)
    .with(P.union("quarter", "eighth", "16th"), () => "noteheadBlack" as const)
    .with("half", () => "noteheadHalf" as const)
    .with("whole", () => "noteheadWhole" as const)
    .otherwise(() => {});
  if (glyphName) return new Glyph(glyphName);
}
