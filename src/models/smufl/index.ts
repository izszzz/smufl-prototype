import * as R from "remeda";
import Metadatas from "./metadata.json";
import BravuraMetadata from "./bravura_metadata.json";
import Glyphnames from "./glyphnames.json";
import Ranges from "./ranges.json";

export * from "./point";
export * from "./rect";
export * from "./bbox";
export * from "./element";
export * from "./bar";
export * from "./masterbar";
export * from "./glyph";
export * from "./glyph_grid";
export * from "./note";
export * from "./row";
export * from "./score";
export * from "./track";
export * from "./accessory";
export * from "./metaevents";
export * from "./rest";
export * from "./sequence";
export * from "./beat";
export * from "./chord";
export * from "./exporter";
export { Metadatas, Ranges, Glyphnames, BravuraMetadata };

export const getGlyphname = (
  type: keyof Ranges,
  predicate: (glyph: Ranges[typeof type]["glyphs"][number]) => boolean
): Ranges[typeof type]["glyphs"][number] => {
  const glyphName = Ranges[type].glyphs.find(predicate);
  if (R.isNullish(glyphName)) throw new Error();
  return glyphName;
};
export const getFractionLiteral = (fraction: number) => {
  const literal = Metadatas.fractions.find(
    ({ value }) => fraction === value
  )?.type;
  if (!literal) throw new Error();
  return literal;
};
export const getCodepoint = (glyphName: keyof Glyphnames) =>
  parseInt(Glyphnames[glyphName].codepoint.replace("U+", ""), 16);
export const getBBox = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphBBoxes[
    glyphName as keyof BravuraMetadata["glyphBBoxes"]
  ];
export const getAdvanceWidth = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphAdvanceWidths[
    glyphName as keyof BravuraMetadata["glyphAdvanceWidths"]
  ];
