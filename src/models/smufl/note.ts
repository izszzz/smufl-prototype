import Core from "../core";
import * as SMUFL from "./";

export class Note extends SMUFL.Element {
  core;
  private get accidental() {
    return !SMUFL.Metadatas.baseWhiteKeys.some((key) => key === this.basePitch);
  }
  get pitch() {
    return this.core.pitch - SMUFL.Metadatas.midiMiddleC;
  }
  get basePitch() {
    return (this.pitch %
      SMUFL.Metadatas.baseOctaveKeys
        .length) as SMUFL.Metadatas["baseOctaveKeys"][number];
  }
  get legerLine() {
    // TODO: middleC以下ラ以上の場合、legerLineの本数を返すようにする
    // もっと言うと、Noteの位置がStaveに重ならない場合は、その分のstaveの本数を返すようにする
    return SMUFL.Metadatas.midiMiddleC >= this.core.pitch;
  }
  private get accidentalLiteral() {
    return "accidentalSharp" as const; // !prevNote
    // 	? "accidentalSharp"
    // 	: prevNote.pitch < pitch
    // 	  ? "accidentalSharp"
    // 	  : "accidentalFlat";
  }
  private get stemLiteral() {
    if (this.fraction === 1) return "";
    return this.pitch >= SMUFL.Metadatas.baseOctaveKeys.length ? "Down" : "Up";
  }
  constructor({ core }: { core: InstanceType<typeof Core.Note> }) {
    super({ core });
    this.core = core;
    this.glyph = new SMUFL.Glyph({
      glyphName: SMUFL.getGlyphname("individualNotes", (glyphName) =>
        glyphName.includes("note" + this.fractionLiteral + this.stemLiteral)
      ),
    });
    this.accessory = new SMUFL.Accessory({
      target: this.glyph,
      left: (() => {
        const glyphs = [];
        if (this.accidental)
          glyphs.push([new SMUFL.Glyph({ glyphName: this.accidentalLiteral })]);
        return glyphs;
      })(),
      middle: (() => {
        const glyphs = [];
        if (this.legerLine)
          glyphs.push(
            // TODO: middleC以外も表示させる
            new SMUFL.Glyph({
              glyphName: SMUFL.getGlyphname(
                "staves",
                (glyphName) =>
                  glyphName.includes("legerLine") &&
                  glyphName.includes(
                    this.fractionLiteral === "Whole" ? "Wide" : ""
                  )
              ),
            })
          );
        return glyphs;
      })(),
      right: (() => {
        const glyphs = [];
        if (0 < this.dot)
          glyphs.push([new SMUFL.Glyph({ glyphName: "augmentationDot" })]);
        return glyphs;
      })(),
    });
    this.y = calcNoteY(core);
    this.init();
  }
}

const isNoteAccidental = (note: InstanceType<typeof Core.Note>) =>
    !SMUFL.Metadatas.baseWhiteKeys.some(
      (key) => key === calcNoteBasePitch(note)
    ),
  calcNoteAccidental = ({
    prev: prevNote,
    pitch,
  }: InstanceType<typeof Core.Note>) => "accidentalSharp" as const,
  // !prevNote
  // 	? "accidentalSharp"
  // 	: prevNote.pitch < pitch
  // 	  ? "accidentalSharp"
  // 	  : "accidentalFlat";
  calcNoteBasePitch = (note: InstanceType<typeof Core.Note>) =>
    (pitchOffset(note) %
      SMUFL.Metadatas.baseOctaveKeys
        .length) as SMUFL.Metadatas["baseOctaveKeys"][number],
  pitchOffset = ({ pitch }: InstanceType<typeof Core.Note>) =>
    pitch - SMUFL.Metadatas.midiMiddleC,
  calcNotePosition = (note: InstanceType<typeof Core.Note>) => {
    let pitch = pitchOffset(note);
    const accidental = isNoteAccidental(note) ? calcNoteAccidental(note) : null;
    if (accidental === "accidentalSharp") pitch -= 1;
    // if (accidental === "accidentalFlat") pitch += 1;
    return pitch;
  },
  calcNoteY = (note: InstanceType<typeof Core.Note>) =>
    (2 - (calcNoteWhiteKeyPosition(note) + calcNoteOctaveY(note))) *
    SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
  calcNoteOctaveY = (note: InstanceType<typeof Core.Note>) =>
    calcNoteOctave(note) * (SMUFL.Metadatas.baseWhiteKeys.length + 1),
  calcNoteWhiteKeyPosition = (note: InstanceType<typeof Core.Note>) =>
    (SMUFL.Metadatas.baseWhiteKeys as number[]).indexOf(
      (SMUFL.Metadatas.baseOctaveKeys as number[]).indexOf(
        calcNotePosition(note)
      )
    ),
  calcNoteOctave = (note: InstanceType<typeof Core.Note>) =>
    Math.trunc(pitchOffset(note) / SMUFL.Metadatas.baseOctaveKeys.length);
// .filter((legerLineGlyphName) =>calcNoteFraction(note))
// .filter((fraction) => fraction)[0]
