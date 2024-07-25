import * as SMUFL from ".";
import Core from "../core";

export class Bar extends SMUFL.Rect {
  core;
  sequence;
  elements;
  clef?: SMUFL.Glyph;
  timesignature?: InstanceType<typeof SMUFL.Metaevents.Map.Timesignature>;
  keysignature?: InstanceType<typeof SMUFL.Metaevents.Map.Keysignature>;
  header;
  // TODO: アクセスするたびにGlyphGridをnewするのを直す
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
    if (core.metaevents.Timesignature)
      this.timesignature = new SMUFL.Metaevents.Map.Timesignature(
        core.timesignature
      );
    if (core.metaevents.Keysignature)
      this.keysignature = new SMUFL.Metaevents.Map.Keysignature(
        core.keysignature
      );
    this.header = this.createHeader();
  }
  createHeader() {
    const glyphs = [];
    if (this.clef) glyphs.push([this.clef]);
    if (this.keysignature)
      glyphs.push(...this.keysignature.glyphs.map((glyph) => [glyph]));
    if (this.timesignature) glyphs.push(this.timesignature.glyphs);
    return new SMUFL.GlyphGrid(glyphs);
  }
  setClef(clef: typeof this.clef) {
    this.clef = clef;
    this.header = this.createHeader();
  }
}
