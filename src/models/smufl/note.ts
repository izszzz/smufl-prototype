import * as R from 'remeda';
import Metadata from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Note } from "../core/note";
import { SMUFLGlyph } from "./glyph";
import { SMUFLLigature } from './ligature';
import { Spacing } from './spacing';
import { SMUFLCoord } from './coord';

export class SMUFLNote extends SMUFLCoord{
	note: Note;
	accidental?: SMUFLGlyph
	glyph: SMUFLGlyph | SMUFLLigature;
	spacing = new Spacing()
	constructor(note: Note){
		super()
		this.note = note
		this.y = this.#calcNoteY(note);
		this.glyph = new SMUFLGlyph(this.#searchNoteGlyphName(note), {y: this.y})
		if(this.#isNoteLegerLine(note)) this.glyph = new SMUFLLigature([new SMUFLGlyph(this.#searchLegerLineGlyphName(note), {y: this.y}), this.glyph])
		if(this.#isNoteAccidental(note)) this.accidental = new SMUFLGlyph(this.#calcNoteAccidental(note), {y: this.y})
	}

	#searchNoteGlyphName = (note: Note) => 
		R.pipe(
			Ranges.individualNotes.glyphs,
			R.filter((glyphName) => glyphName !== "augmentationDot"),
			R.filter((glyphName) => glyphName.includes("note")),
			R.filter((noteGlyphName) => noteGlyphName.includes(String(this.#calcNoteFraction(note)))),
			R.filter((fraction) => fraction.includes(String(this.#calcNoteStem(note)))),
		)[0]
		
	#searchLegerLineGlyphName = (note: Note) => 
		Ranges.staves.glyphs
			.filter((glyphName) => glyphName.includes("legerLine"))[0] // TODO: middle C以外のlegerlineも表示できるようにする
			// .filter((legerLineGlyphName) =>calcNoteFraction(note))
			// .filter((fraction) => fraction)[0]
	#ajustNotePitch = ({pitch}:Note) => pitch - Metadata.midiMiddleC
	#calcNoteBasePitch = (note: Note) => this.#ajustNotePitch(note) % Metadata.baseOctaveKeys.length as Metadata["baseOctaveKeys"][number]
	#calcNoteAccidental = ({prevNote, pitch}: Note) => !prevNote ? "accidentalSharp": prevNote.pitch < pitch ? "accidentalSharp" : "accidentalFlat";
	#calcNoteStem = (note: Note) => this.#ajustNotePitch(note) >= Metadata.baseOctaveKeys.length ? "Down" : "Up"
	#calcNoteOctave = (note: Note) => Math.trunc(this.#ajustNotePitch(note) / Metadata.baseOctaveKeys.length)
	#calcNoteOctaveY = (note: Note) => this.#calcNoteOctave(note) * (Metadata.baseWhiteKeys.length + 1)
	#calcNotePosition = (note: Note) =>{
		let pitch =  this.#ajustNotePitch(note)
		const accidental = this.#isNoteAccidental(note) ? this.#calcNoteAccidental(note) : null
		if(accidental === "accidentalSharp") pitch -= 1
		if(accidental === "accidentalFlat") pitch += 1
		return pitch
	}
	#calcNoteWhiteKeyPosition = (note: Note) => 
		(Metadata.baseWhiteKeys as number[]).indexOf((Metadata.baseOctaveKeys as number[]).indexOf(this.#calcNotePosition(note)));
	#calcNoteY = (note:Note) =>  (2 - (this.#calcNoteWhiteKeyPosition(note) + this.#calcNoteOctaveY(note))) * BravuraMetadata.engravingDefaults.thickBarlineThickness
	#calcNoteFraction = ({fraction}: Note): Metadata["noteFractions"][number]=> {
		if (fraction === 2) return "Half"
		if (fraction === 4) return "Quarter"
		if (fraction === 8) return "8th"
		if (fraction === 16) return "16th"
		return "Whole"
	}
	#isNoteAccidental = (note: Note) => !(Metadata.baseWhiteKeys).some((key)=> key===this.#calcNoteBasePitch(note))
	#isNoteLegerLine = (note: Note) => 0 === this.#calcNotePosition(note)
}