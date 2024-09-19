import * as SMUFL from ".";
import * as Core from "./core";

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
    core: Core.Bar;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.elements = elements;
    if (this.core.id === 11) console.log(this);
    this.sequence = new SMUFL.Sequence({ core: core.sequence, elements }); // barをまたぐNoteがある場合がある
    if (core.masterbar.metaevents.Timesignature)
      this.timesignature = new SMUFL.Metaevents.Map.Timesignature(
        core.masterbar.metaevents.Timesignature
      );
    if (core.masterbar.metaevents.Keysignature)
      this.keysignature = new SMUFL.Metaevents.Map.Keysignature(
        core.masterbar.metaevents.Keysignature
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
