import * as Core from "core";
import { Ligature } from "./ligature";
import { Glyph } from "./glyph";
import { GlyphType } from "sheet";
import musicTheory from "../../const/music-theory.json";

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
            (5 < pitchClass.value ? musicTheory.pitchClasses.length : 0) +
              pitchClass.value
          ),
        ]),
      ],
      0
    );
  }
}
