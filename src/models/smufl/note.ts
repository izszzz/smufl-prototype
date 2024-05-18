import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

interface INote {
  core: Core.Note;
}
export class Note extends SMUFL.Element implements INote {
  core;
  constructor({ core }: INote) {
    const accessory: SMUFL.Element["accessory"] = {
      left: new SMUFL.Glyphs({
        glyphs: R.pipe(
          [],
          R.conditional(
            [
              () => isNoteAccidental(core),
              R.concat([
                [
                  new SMUFL.Glyph({
                    glyphName: calcNoteAccidental(core),
                  }),
                ],
              ]),
            ],
            R.conditional.defaultCase(() => [])
          )
        ),
      }),
      middle: R.pipe(
        [],
        R.conditional(
          [
            () => isNoteLegerLine(core),
            R.concat([
              new SMUFL.Glyph({
                glyphName: searchLegerLineGlyphName(core),
              }),
            ]),
          ],
          R.conditional.defaultCase(() => [])
        )
      ),
      right: new SMUFL.Glyphs({ glyphs: [] }),
    };
    const glyph = new SMUFL.Glyph({
      glyphName: SMUFL.getGlyphname(
        "individualNotes",
        (glyphName) =>
          glyphName !== "augmentationDot" &&
          glyphName.includes("note") &&
          glyphName.includes(SMUFL.getFractionLiteral(core.fraction)) &&
          glyphName.includes(Note.getStemLiteral(core))
      ),
    });
    super({
      glyph,
      accessory,
    });
    this.core = core;
    this.y = calcNoteY(core);
    this.width = this.glyphs.width;
  }
  static getStemLiteral = (note: Core.Note) =>
    pitchOffset(note) >= SMUFL.Metadatas.baseOctaveKeys.length ? "Down" : "Up";
}
const isNoteAccidental = (note: Core.Note) =>
    !SMUFL.Metadatas.baseWhiteKeys.some(
      (key) => key === calcNoteBasePitch(note)
    ),
  calcNoteAccidental = ({ prev: prevNote, pitch }: Core.Note) =>
    "accidentalSharp" as const,
  // !prevNote
  // 	? "accidentalSharp"
  // 	: prevNote.pitch < pitch
  // 	  ? "accidentalSharp"
  // 	  : "accidentalFlat";
  calcNoteBasePitch = (note: Core.Note) =>
    (pitchOffset(note) %
      SMUFL.Metadatas.baseOctaveKeys
        .length) as SMUFL.Metadatas["baseOctaveKeys"][number],
  pitchOffset = ({ pitch }: Core.Note) => pitch - SMUFL.Metadatas.midiMiddleC,
  isNoteLegerLine = (note: Core.Note) => 0 === calcNotePosition(note),
  calcNotePosition = (note: Core.Note) => {
    let pitch = pitchOffset(note);
    const accidental = isNoteAccidental(note) ? calcNoteAccidental(note) : null;
    if (accidental === "accidentalSharp") pitch -= 1;
    // if (accidental === "accidentalFlat") pitch += 1;
    return pitch;
  },
  calcNoteY = (note: Core.Note) =>
    (2 - (calcNoteWhiteKeyPosition(note) + calcNoteOctaveY(note))) *
    SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
  calcNoteOctaveY = (note: Core.Note) =>
    calcNoteOctave(note) * (SMUFL.Metadatas.baseWhiteKeys.length + 1),
  calcNoteWhiteKeyPosition = (note: Core.Note) =>
    (SMUFL.Metadatas.baseWhiteKeys as number[]).indexOf(
      (SMUFL.Metadatas.baseOctaveKeys as number[]).indexOf(
        calcNotePosition(note)
      )
    ),
  calcNoteOctave = (note: Core.Note) =>
    Math.trunc(pitchOffset(note) / SMUFL.Metadatas.baseOctaveKeys.length),
  searchLegerLineGlyphName = (note: Core.Note) =>
    SMUFL.Ranges.staves.glyphs.filter((glyphName) =>
      glyphName.includes("legerLine")
    )[0]; // TODO: middle C以外のlegerlineも表示できるようにする
// .filter((legerLineGlyphName) =>calcNoteFraction(note))
// .filter((fraction) => fraction)[0]
