import * as R from 'remeda';
import *  as SMUFL from "./"
import Metadata from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Note as CoreNote } from "../core/note";
import { Spacing } from './spacing';

export class Note extends SMUFL.Coord{
	note: CoreNote;
	accidental?: SMUFL.Glyph
	glyph: SMUFL.Glyph | SMUFL.Ligature;
	spacing = new Spacing()
	constructor(note: CoreNote){
		super()
		this.note = note
		this.y = this.#calcNoteY(note);
		this.glyph = new SMUFL.Glyph(this.#searchNoteGlyphName(note), {y: this.y})
		if(this.#isNoteLegerLine(note)) this.glyph = new SMUFL.Ligature([new SMUFL.Glyph(this.#searchLegerLineGlyphName(note), {y: this.y}), this.glyph])
		if(this.#isNoteAccidental(note)) this.accidental = new SMUFL.Glyph(this.#calcNoteAccidental(note), {y: this.y})
	}

	#searchNoteGlyphName = (note: CoreNote) => 
		R.pipe(
			Ranges.individualNotes.glyphs,
			R.filter((glyphName) => glyphName !== "augmentationDot"),
			R.filter((glyphName) => glyphName.includes("note")),
			R.filter((noteGlyphName) => noteGlyphName.includes(String(this.#calcNoteFraction(note)))),
			R.filter((fraction) => fraction.includes(String(this.#calcNoteStem(note)))),
		)[0]
		
	#searchLegerLineGlyphName = (note: CoreNote) => 
		Ranges.staves.glyphs
			.filter((glyphName) => glyphName.includes("legerLine"))[0] // TODO: middle C以外のlegerlineも表示できるようにする
			// .filter((legerLineGlyphName) =>calcNoteFraction(note))
			// .filter((fraction) => fraction)[0]
	#ajustNotePitch = ({pitch}:CoreNote) => pitch - Metadata.midiMiddleC
	#calcNoteBasePitch = (note: CoreNote) => this.#ajustNotePitch(note) % Metadata.baseOctaveKeys.length as Metadata["baseOctaveKeys"][number]
	#calcNoteAccidental = ({prevNote, pitch}: CoreNote) => !prevNote ? "accidentalSharp": prevNote.pitch < pitch ? "accidentalSharp" : "accidentalFlat";
	#calcNoteStem = (note: CoreNote) => this.#ajustNotePitch(note) >= Metadata.baseOctaveKeys.length ? "Down" : "Up"
	#calcNoteOctave = (note: CoreNote) => Math.trunc(this.#ajustNotePitch(note) / Metadata.baseOctaveKeys.length)
	#calcNoteOctaveY = (note: CoreNote) => this.#calcNoteOctave(note) * (Metadata.baseWhiteKeys.length + 1)
	#calcNotePosition = (note: CoreNote) =>{
		let pitch =  this.#ajustNotePitch(note)
		const accidental = this.#isNoteAccidental(note) ? this.#calcNoteAccidental(note) : null
		if(accidental === "accidentalSharp") pitch -= 1
		if(accidental === "accidentalFlat") pitch += 1
		return pitch
	}
	#calcNoteWhiteKeyPosition = (note: CoreNote) => 
		(Metadata.baseWhiteKeys as number[]).indexOf((Metadata.baseOctaveKeys as number[]).indexOf(this.#calcNotePosition(note)));
	#calcNoteY = (note:CoreNote) =>  (2 - (this.#calcNoteWhiteKeyPosition(note) + this.#calcNoteOctaveY(note))) * BravuraMetadata.engravingDefaults.thickBarlineThickness
	#calcNoteFraction = ({fraction}: CoreNote) => 
		Metadata.noteFractions.find(({value}) => fraction === value)?.type
	#isNoteAccidental = (note: CoreNote) => !(Metadata.baseWhiteKeys).some((key)=> key===this.#calcNoteBasePitch(note))
	#isNoteLegerLine = (note: CoreNote) => 0 === this.#calcNotePosition(note)
}