import Metadata from "../smufl/metadata.json";
import BravuraMetadata from "../smufl/bravura_metadata.json";
import Glyphnames from "../smufl/glyphnames.json";
import Ranges from "../smufl/ranges.json";
export * from "./score";
export * from "./track";
export * from "./note";
export * from "./bar";
export * from "./transform";
export * from "./rect";
export * from "./glyph";
export * from "./bbox";
export * from "./masterbar";
export * from "./timesignature";
export * from "./keysignature";
export * from "./bpm";
export * from "./clef";
export * from "./part";
export * from "./stem";
export * from "./notehead";
export * from "./flag";
export * from "./staff";
export * from "./stafflines";
export { Metadata, Ranges, Glyphnames, BravuraMetadata };
export const getGlyphname = (
  type: keyof Ranges,
  predicate: (glyph: Ranges[typeof type]["glyphs"][number]) => boolean
): Ranges[typeof type]["glyphs"][number] =>
  Ranges[type].glyphs.find(predicate)!;
export const getFractionLiteral = (fraction: number) =>
  Metadata.fractions.find(({ value }) => fraction === value)!.type;
export const getBBox = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphBBoxes[
    glyphName as keyof BravuraMetadata["glyphBBoxes"]
  ];
export const getAdvanceWidth = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphAdvanceWidths[
    glyphName as keyof BravuraMetadata["glyphAdvanceWidths"]
  ];
