import * as R from "remeda";
import Metadatas from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/bravura_metadata.json";
import Glyphnames from "../../consts/glyphnames.json";
import Ranges from "../../consts/ranges.json";

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

export const getBBox = (glyphName: keyof Glyphnames) => {
  const { bBoxNE, bBoxSW } =
    BravuraMetadata.glyphBBoxes[
      glyphName as keyof BravuraMetadata["glyphBBoxes"]
    ];
  const width = bBoxNE[0] - bBoxSW[0];
  const height = bBoxNE[1] - bBoxSW[1];
  return { /*x: bBoxNE[0], y: bBoxSW[1], */ width, height };
};
