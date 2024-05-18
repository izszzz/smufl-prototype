import * as SMUFL from "./";
import * as Core from "../core";
import { Bar as CoreBar } from "./core/bar";
import { Rest as CoreRest } from "./core/rest";

interface IBar {
  elements: SMUFL.Element<Core.Note | CoreRest>[];
  core: CoreBar;
  barline: {
    start: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
    end?: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
  };
  metadata?: SMUFL.Metadata;
}

export class Bar extends SVGRect implements IBar {
  elements;
  core;
  barline: {
    start: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
    end?: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
  } = {
    start: new SMUFL.Glyph({ glyphName: "barlineSingle" }),
  };
  metadata;
  constructor({ core, elements: notes, metadata }: Omit<IBar, "barline">) {
    super();
    this.core = core;
    this.elements = notes;
    this.metadata = metadata;
  }
}
