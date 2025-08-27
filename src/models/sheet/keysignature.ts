import * as Core from "core";
import { Ligature } from "./ligature";
import { Glyph } from "./glyph";
import { GlyphType } from "sheet";

export class Keysignature extends Core.Keysignature {
  override get accidentalPitchClasses() {
    return super.accidentalPitchClasses.reverse();
  }
  get ligature() {
    return new Ligature(
      [
        ...this.accidentalPitchClasses.map((pitchClass) => [
          new Glyph(
            GlyphType.Accidental,
            pitchClass.toPitchClassName(this.tonality).toneIndex / 2
          ),
        ]),
      ],
      0
    );
  }
}
