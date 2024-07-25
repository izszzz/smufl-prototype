import * as R from "remeda";
import * as SMUFL from ".";
import Core from "../core";

export class Note extends SMUFL.Element {
  core;
  track;
  private get accidental() {
    return !SMUFL.Metadatas.baseWhiteKeys.some((key) => key === this.basePitch);
  }
  get pitch() {
    return this.core.pitch - SMUFL.Metadatas.midiMiddleC;
  }
  get basePitch() {
    return modulo12(this.core.pitch);
  }
  get legerLine() {
    if (this.y >= 1) return Math.floor(this.y);
    return 0;
  }
  get octave() {
    return (
      Math.trunc(this.core.pitch / SMUFL.Metadatas.baseOctaveKeys.length) - 1
    );
  }
  private get accidentalLiteral() {
    return "accidentalSharp" as const;
  }
  private get stemLiteral() {
    if (this.fraction === 1) return "";
    return this.pitch >= SMUFL.Metadatas.baseOctaveKeys.length ? "Down" : "Up";
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
    this.y = calcNoteY(core) + SMUFL.Metadatas.baseWhiteKeys.length * 2;
    this.accessory = new SMUFL.Accessory({
      target: this.glyph,
      left: (() => {
        const glyphs = [];
        if (this.accidental)
          glyphs.push([new SMUFL.Glyph({ glyphName: this.accidentalLiteral })]);
        return glyphs;
      })(),
      middle: (() => {
        return R.times(
          this.legerLine,
          (i) =>
            new SMUFL.Glyph({
              glyphName: SMUFL.getGlyphname(
                "staves",
                (glyphName) =>
                  glyphName.includes("legerLine") &&
                  glyphName.includes(
                    this.fractionLiteral === "Whole" ? "Wide" : ""
                  )
              ),
              y: i - this.y + 1,
            })
        );
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
}

const calcNoteY = (note: InstanceType<typeof Core.Note>) =>
    (2 - (calcNoteOctaveY(note) + calcNoteWhiteKeyPosition(note))) *
    SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
  calcNoteOctaveY = (note: InstanceType<typeof Core.Note>) =>
    calcNoteOctave(note) * SMUFL.Metadatas.baseWhiteKeys.length,
  calcNoteWhiteKeyPosition = (note: InstanceType<typeof Core.Note>) =>
    (SMUFL.Metadatas.baseWhiteKeys as number[]).indexOf(
      (SMUFL.Metadatas.baseOctaveKeys as number[]).indexOf(modulo12(note.pitch))
    ),
  calcNoteOctave = (note: InstanceType<typeof Core.Note>) =>
    Math.trunc(note.pitch / SMUFL.Metadatas.baseOctaveKeys.length) - 1;

function modulo12(n: number): number {
  return (
    ((n % SMUFL.Metadatas.baseOctaveKeys.length) +
      SMUFL.Metadatas.baseOctaveKeys.length) %
    SMUFL.Metadatas.baseOctaveKeys.length
  );
}
