import * as R from "remeda";
import Metadatas from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Glyphnames from "../../consts/metadata/glyphnames.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Glyph } from "./glyph";

export * from "./position";
export * from "./bar";
export * from "./masterbar";
export * from "./barline";
export * from "./glyph";
export * from "./glyphs";
export * from "./ligature";
export * from "./note";
export * from "./row";
export * from "./score";
export * from "./spacing";
export * from "./staff";
export * from "./track";
export * from "./box";
export * from "./metadata";
export { Metadatas, Ranges, Glyphnames, BravuraMetadata, Glyph };

export const safeSum = (...num: (number | null | undefined)[]) =>
	R.pipe(num, R.filter(R.isTruthy), R.reduce(R.add, 0));
