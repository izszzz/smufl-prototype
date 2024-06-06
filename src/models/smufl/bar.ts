import * as SMUFL from ".";
import Core from "../core";

export class Bar extends SMUFL.Rect {
  core;
  barline: {
    start: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
    end?: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
  } = {
    start: new SMUFL.Glyph({ glyphName: "barlineSingle" }),
  };
  metadata;
  sequence;
  elements;
  constructor({
    core,
    metadata,
    elements,
  }: {
    core: InstanceType<typeof Core.Bar>;
    metadata?: SMUFL.Metadata;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.metadata = metadata;
    this.elements = elements;
    this.sequence = new SMUFL.Sequence({
      core: core.sequence,
      elements: elements,
    });
  }
}
