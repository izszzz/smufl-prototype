import Metadatas from "./metadata.json";
import BravuraMetadata from "./bravura_metadata.json";
import Glyphnames from "./glyphnames.json";
import Ranges from "./ranges.json";

export * from "./bbox";
export * from "./glyph";

export { Metadatas, Ranges, Glyphnames, BravuraMetadata };
export const getGlyphname = (
  type: keyof Ranges,
  predicate: (glyph: Ranges[typeof type]["glyphs"][number]) => boolean
): Ranges[typeof type]["glyphs"][number] =>
  Ranges[type].glyphs.find(predicate)!;

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
