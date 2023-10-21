import Metadata from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Note } from "../core/note";
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";

export class SMUFLNote extends SMUFLElement{
	glyphs: (SMUFLGlyph| SMUFLGlyph[])[] = [];
	constructor(note: Note){
		super()
		this.y = this.calcNoteY(note);
		this.glyphs.push(new SMUFLGlyph(this, this.searchNoteGlyphName(note), {y: this.y}))
		if(this.isNoteLegerLine(note)) this.glyphs.push([this.glyphs.pop() as SMUFLGlyph, new SMUFLGlyph(this, this.searchLegerLineGlyphName(note), {y: this.y})])
		if(this.isNoteAccidental(note)) this.glyphs.unshift(new SMUFLGlyph(this, this.calcNoteAccidental(note)))
	}

	private searchNoteGlyphName = (note: Note) => 
		Ranges.individualNotes.glyphs
			.filter((glyphName) => glyphName !== "augmentationDot")
			.filter((glyphName) => glyphName.includes("note"))	
			.filter((noteGlyphName) => noteGlyphName.includes(String(this.calcNoteFraction(note))))
			.filter((fraction) => fraction.includes(String(this.calcNoteStem(note))))[0]
	private searchLegerLineGlyphName = (note: Note) => 
		Ranges.staves.glyphs
			.filter((glyphName) => glyphName.includes("legerLine"))[0]
			// .filter((legerLineGlyphName) =>calcNoteFraction(note))
			// .filter((fraction) => fraction)[0]
	private ajustNotePitch = ({pitch}:Note) => pitch - Metadata.midiMiddleC
	private calcNoteBasePitch = (note: Note) => this.ajustNotePitch(note) % Metadata.baseOctaveKeys.length as Metadata["baseOctaveKeys"][number]
	private calcNoteAccidental = ({prevNote, pitch}: Note) => !prevNote ? "accidentalSharp": prevNote.pitch < pitch ? "accidentalSharp" : "accidentalFlat";
	private calcNoteStem = (note: Note) => this.ajustNotePitch(note) >= 11 ? "Down" : "Up"
	private calcNoteOctave = (note: Note) => Math.trunc(this.ajustNotePitch(note) / Metadata.baseOctaveKeys.length)
	private calcNoteOctaveY = (note: Note) => this.calcNoteOctave(note) * (Metadata.baseWhiteKeys.length + 1)
	private calcNotePosition = (note: Note) =>{
		let pitch =  this.ajustNotePitch(note)
		const accidental = this.isNoteAccidental(note) ? this.calcNoteAccidental(note) : null
		if(accidental === "accidentalSharp") pitch -= 1
		if(accidental === "accidentalFlat") pitch += 1
		return pitch
	}
	private calcNoteWhiteKeyPosition = (note: Note) => 
		(Metadata.baseWhiteKeys as number[]).indexOf((Metadata.baseOctaveKeys as number[]).indexOf(this.calcNotePosition(note)));
	private calcNoteY = (note:Note) =>  (2 - (this.calcNoteWhiteKeyPosition(note) + this.calcNoteOctaveY(note))) * BravuraMetadata.engravingDefaults.thickBarlineThickness
	private calcNoteFraction = ({fraction}: Note): Metadata["noteFractions"][number]=> {
		if (fraction === 2) return "Half"
		if (fraction === 4) return "Quarter"
		if (fraction === 8) return "8th"
		if (fraction === 16) return "16th"
		return "Whole"
	}
	private isNoteAccidental = (note: Note) => !(Metadata.baseWhiteKeys).some((key)=> key===this.calcNoteBasePitch(note))
	private isNoteLegerLine = (note: Note) => 0 === this.calcNotePosition(note)
}