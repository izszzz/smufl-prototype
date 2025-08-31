import BravuraMetadata from "../../const/bravura/bravura_metadata.json";
import Glyphnames from "../../const/smufl/glyphnames.json";
import Ranges from "../../const/smufl/ranges.json";

export * from "./row";
export * from "./masterbar";
export * from "./timesignature";
export * from "./bar";
export * from "./stave";
export * from "./note";
export * from "./score";
export * from "./track";
export * from "./glyph";

export { Ranges, Glyphnames, BravuraMetadata };

export const getGlyphBBox = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphBBoxes[
    glyphName as keyof BravuraMetadata["glyphBBoxes"]
  ];
export const getGlyphAdvanceWidth = (glyphName: keyof Glyphnames) =>
  BravuraMetadata.glyphAdvanceWidths[
    glyphName as keyof BravuraMetadata["glyphAdvanceWidths"]
  ];
export const getGlyphWithAnchor = <T extends keyof Glyphnames>(glyphName: T) =>
  BravuraMetadata.glyphsWithAnchors[
    glyphName as keyof BravuraMetadata["glyphsWithAnchors"]
  ];
