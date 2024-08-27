import * as Core from "../core";
import * as SMUFL from ".";
import { Timesignature } from "./timesignature";
import { Keysignature } from "./keysignature";

export class Metaevents extends SMUFL.Rect {
  glyphGrid;
  core;

  constructor(core: Core.Metaevents) {
    super();
    this.core = core;
    this.glyphGrid = new SMUFL.GlyphGrid([
      [new SMUFL.Glyph({ glyphName: "gClef", y: -1 })],
    ]);
    this.width = this.glyphGrid.width;
  }
  static Map = {
    Timesignature,
    Keysignature,
  };
}
