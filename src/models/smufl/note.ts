import * as R from "remeda";
import * as SMUFL from ".";
import * as Core from "./core";
import * as Unit2X from "./unit2x";
import { match } from "ts-pattern";

export class Note extends SMUFL.Element {
  core;
  track;
  pitch;

  get accidental(): "natural" | "sharp" | "flat" | undefined {
    const keysignature = this.core.metaevent.Keysignature;
    if (
      (keysignature.accidentalKeys as number[]).includes(this.pitch.pitchClass)
    )
      return "natural";
    if ((keysignature.blackKeys as number[]).includes(this.pitch.pitchClass))
      return "sharp";
  }
  get legerLine() {
    if (this.y <= -4) return Math.ceil(this.y + 4);
    if (this.y >= 1) return Math.floor(this.y);
    return 0;
  }
  get octave() {
    return Math.trunc(this.core.pitch / Core.Metadata.pitchClasses.length) - 1;
  }
  get whiteKey() {
    return (Core.Metadata.majorWhiteNotes as number[]).indexOf(
      (Core.Metadata.pitchClasses as number[]).indexOf(this.pitch.pitchClass)
    );
  }
  private get stemLiteral() {
    if (this.fraction === 1) return "";
    return this.core.pitch - SMUFL.Metadatas.midiMiddleC >=
      Core.Metadata.pitchClasses.length
      ? "Down"
      : "Up";
  }
  constructor(core: Core.Note, track: SMUFL.Track) {
    super({ core });
    this.core = core;
    this.track = track;
    this.pitch = new Unit2X.Pitch(this.core.pitch);
    this.glyph = new SMUFL.Glyph({
      glyphName: SMUFL.getGlyphname("individualNotes", (glyphName) =>
        glyphName.includes("note" + this.fractionLiteral + this.stemLiteral)
      ),
    });
    this.y = this.calcNoteY() + Core.Metadata.majorWhiteNotes.length * 2;
    this.accessory = new SMUFL.Accessory({
      target: this.glyph,
      left: (() => {
        const glyphs = [];
        if (R.isNonNullish(this.accidental))
          glyphs.push([
            new SMUFL.Glyph({
              glyphName: match(this.accidental)
                .with("sharp", () => "accidentalSharp" as const)
                .with("flat", () => "accidentalFlat" as const)
                .with("natural", () => "accidentalNatural" as const)
                .exhaustive(),
            }),
          ]);
        return glyphs;
      })(),
      middle: (() => {
        return R.times(Math.abs(this.legerLine), (i) => {
          return new SMUFL.Glyph({
            glyphName: SMUFL.getGlyphname(
              "staves",
              (glyphName) =>
                glyphName.includes("legerLine") &&
                glyphName.includes(
                  this.fractionLiteral === "Whole" ? "Wide" : ""
                )
            ),
            y: i - this.calcLegerLineY(),
          });
        });
      })(),
      right: (() => {
        const glyphs = [];
        if (0 < this.dot)
          glyphs.push([new SMUFL.Glyph({ glyphName: "augmentationDot" })]);
        return glyphs;
      })(),
    });
    this.init();
  }
  calcNoteY() {
    return (
      (2 -
        (this.octave * Core.Metadata.majorWhiteNotes.length + this.whiteKey)) *
      SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness
    );
  }
  calcLegerLineY() {
    if (Math.sign(this.legerLine) === 1) return this.y - 1;
    if (Math.sign(this.legerLine) === -1) return -(this.y + 6);
    return 0;
  }
}
