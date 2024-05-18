import * as R from "remeda";
import Metadatas from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/bravura_metadata.json";
import Glyphnames from "../../consts/glyphnames.json";
import Ranges from "../../consts/ranges.json";

export * from "./position";
export * from "./element";
export * from "./bar";
export * from "./masterbar";
export * from "./glyph";
export * from "./glyphs";
export * from "./note";
export * from "./row";
export * from "./score";
export * from "./spacing";
export * from "./staff";
export * from "./track";
export * from "./box";
export * from "./accessory";
export * from "./metadata";
export * from "./rest";
export { Metadatas, Ranges, Glyphnames, BravuraMetadata };

export const getGlyphname = (
  type: keyof Ranges,
  predicate: (glyph: Ranges[typeof type]["glyphs"][number]) => boolean
): Ranges[typeof type]["glyphs"][number] => {
  const glyphName = Ranges[type].glyphs.find(predicate);
  if (R.isNullish(glyphName)) throw new Error();
  return glyphName;
};

export const getFractionLiteral = (
  fraction: number
  //TODO:
  //   Metadatas["fractions"][number]["value"]
) => {
  const literal = Metadatas.fractions.find(
    ({ value }) => fraction === value
  )?.type;
  if (!literal) throw new Error();
  return literal;
};

export const getCodepoint = (glyphName: keyof Glyphnames) =>
  parseInt(Glyphnames[glyphName].codepoint.replace("U+", ""), 16);
