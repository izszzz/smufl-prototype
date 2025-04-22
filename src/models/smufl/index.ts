import Metadatas from "./metadata.json";
import BravuraMetadata from "./bravura_metadata.json";
import Glyphnames from "./glyphnames.json";
import Ranges from "./ranges.json";

export * from "./bbox";
export * from "./glyph";
export * from "./score";
export * from "./masterbar";
export * from "./bar";
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
