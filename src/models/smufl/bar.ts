import * as SMUFL from ".";
import Core from "../core";

export class Bar extends SMUFL.Rect {
  core;
  sequence;
  elements;
  clef?: SMUFL.Glyph;
  timesignature?: InstanceType<typeof SMUFL.Metaevents.Map.Timesignature>;
  // TODO: アクセスするたびにGlyphGridをnewするのを直す
  get header() {
    const glyphs = [];
    if (this.clef) glyphs.push([this.clef]);
    if (this.timesignature) glyphs.push(this.timesignature.glyphs);
    return new SMUFL.GlyphGrid(glyphs);
  }
  constructor({
    core,
    elements,
  }: {
    core: InstanceType<typeof Core.Bar>;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.elements = elements;
    this.sequence = new SMUFL.Sequence({
      core: core.sequence,
      elements: elements,
    });
    if (core.timesignature)
      this.timesignature = new SMUFL.Metaevents.Map.Timesignature(
        core.timesignature
      );
  }
}
