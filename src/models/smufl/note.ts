import * as R from "remeda";
import * as SMUFL from ".";
import Core from "../core";

export class Note extends SMUFL.Element {
  core;
  track;
  private get accidental() {
    return !SMUFL.Metadatas.baseWhiteKeys.some((key) => key === this.basePitch);
  }
  get basePitch() {
    return (
      ((this.core.pitch % SMUFL.Metadatas.baseOctaveKeys.length) +
        SMUFL.Metadatas.baseOctaveKeys.length) %
      SMUFL.Metadatas.baseOctaveKeys.length
    );
  }
  get legerLine() {
    // TODO: track.heightで計算できるようにしてもいい
    if (this.y <= -4) return Math.ceil(this.y + 4);
    if (this.y >= 1) return Math.floor(this.y);
    return 0;
  }
  get octave() {
    return (
      Math.trunc(this.core.pitch / SMUFL.Metadatas.baseOctaveKeys.length) - 1
    );
  }
  get whiteKey() {
    return (SMUFL.Metadatas.baseWhiteKeys as number[]).indexOf(
      (SMUFL.Metadatas.baseOctaveKeys as number[]).indexOf(this.basePitch)
    );
  }
  private get accidentalLiteral() {
    return "accidentalSharp" as const;
  }
  private get stemLiteral() {
    if (this.fraction === 1) return "";
    return this.core.pitch - SMUFL.Metadatas.midiMiddleC >=
      SMUFL.Metadatas.baseOctaveKeys.length
      ? "Down"
      : "Up";
  }
  constructor(core: InstanceType<typeof Core.Note>, track: SMUFL.Track) {
    super({ core });
    this.core = core;
    this.track = track;
    this.glyph = new SMUFL.Glyph({
      glyphName: SMUFL.getGlyphname("individualNotes", (glyphName) =>
        glyphName.includes("note" + this.fractionLiteral + this.stemLiteral)
      ),
    });
    this.y = this.calcNoteY() + SMUFL.Metadatas.baseWhiteKeys.length * 2;
    console.log(this.calcLegerLineY());
    this.accessory = new SMUFL.Accessory({
      target: this.glyph,
      left: (() => {
        const glyphs = [];
        if (this.accidental)
          glyphs.push([new SMUFL.Glyph({ glyphName: this.accidentalLiteral })]);
        return glyphs;
      })(),
      middle: (() => {
        return R.times(Math.abs(this.legerLine), (i) => {
          console.log(i, this.calcLegerLineY(), this.y);
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
        (this.octave * SMUFL.Metadatas.baseWhiteKeys.length + this.whiteKey)) *
      SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness
    );
  }
  calcLegerLineY() {
    if (Math.sign(this.legerLine) === 1) return this.y - 1;
    if (Math.sign(this.legerLine) === -1) return -(this.y + 6);
    return 0;
  }
}
