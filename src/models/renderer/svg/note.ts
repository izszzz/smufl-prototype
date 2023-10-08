import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Note from "../../note";
import Classes from "../../../consts/metadata/classes.json";
import Glyphnames from "../../../consts/metadata/glyphnames.json";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";

type NOTE_FRACTION = "Whole" | "Half" | "Quarter" | "8th" | "16th"
const MIDI_MIDDLE_C = 60;
const BASE_WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11];
const BASE_OCTAVE_KEYS = [...Array(12)].map((_,i)=>i)

export interface SMUFLElement {
	type?: string
	y?: number
	x?: number
	width: number
	height?: number
	children?: SMUFLElement[]
}
export interface SMUFLGroup extends SMUFLElement{
}
export interface SMUFLText extends SMUFLElement{
	glyphName: keyof Glyphnames;
}
export default function SVGNote(note: Note){
	const children: SMUFLText[] = []
	const noteGlyphName = searchNoteGlyphName(note)
	const noteBBox = getBBox(noteGlyphName)
	const accidentalGlyphName: Classes["accidentals"][number] | null = isNoteAccidental(note) ? calcNoteAccidental(note) :null 
	
	if(accidentalGlyphName){
		const accidentalBBox = getBBox(accidentalGlyphName)
		children.push({type:"accidental", glyphName: accidentalGlyphName, ...accidentalBBox})
	}

	children.push({glyphName: noteGlyphName, ...noteBBox})
	
	return { 
		type: "note", 
		y: calcNoteY(note), 
		width: children.reduce((acc, item)=>acc + item.width, 0), 
		children: children.map((child, i, array) => {
			if(array[i-1]) return {...child, x: array[i-1].width}
			return child
		})
	}
}
const searchNoteGlyphName = (note: Note) => 
	Classes.forTextBasedApplications
		.filter((glyphName) => glyphName.includes("note"))	
		.filter((noteGlyphName) => noteGlyphName.includes(String(calcNoteFraction(note))))
		.filter((noteGlyphName) => noteGlyphName.includes(String(calcNoteStem(note))))[0]
const ajustNotePitch = ({pitch}:Note) => pitch - MIDI_MIDDLE_C
const calcNoteBasePitch = (note: Note): number => ajustNotePitch(note) % BASE_OCTAVE_KEYS.length
const calcNoteAccidental = ({prevNote, pitch}: Note) => !prevNote ? "accidentalSharp": prevNote.pitch < pitch ? "accidentalSharp" : "accidentalFlat";
const calcNoteStem = (note: Note) => ajustNotePitch(note) >= 11 ? "Down" : "Up"
const calcNoteOctave = (note: Note) => Math.trunc(ajustNotePitch(note) / BASE_OCTAVE_KEYS.length)
const calcNoteOctaveY = (note: Note) => calcNoteOctave(note) * (BASE_WHITE_KEYS.length + 1)
const calcNoteWhiteKeyPosition = (note: Note) => {
	let pitch =  ajustNotePitch(note)
	const accidental = isNoteAccidental(note) ? calcNoteAccidental(note) : null
	if(accidental === "accidentalSharp") pitch -= 1
	if(accidental === "accidentalFlat") pitch +=1
	return BASE_WHITE_KEYS.indexOf(BASE_OCTAVE_KEYS.indexOf(pitch));
}
const calcNoteY = (note:Note) =>  (2 - (calcNoteWhiteKeyPosition(note) + calcNoteOctaveY(note))) * bravuraMetadata.engravingDefaults.thickBarlineThickness
const calcNoteFraction = ({durationTicks}: Note): NOTE_FRACTION => {
	// 480はmidi ticksにおける四分音符の長さ
	// 4 は4拍 TODO: Trackに
	const fraction = 480 * 4 / durationTicks 
	if (fraction === 2) return "Half"
	if (fraction === 4) return "Quarter"
	if (fraction === 8) return "8th"
	if (fraction === 16) return "16th"
	return "Whole"
}
const isNoteAccidental = (note: Note) =>!BASE_WHITE_KEYS.includes(calcNoteBasePitch(note))
const getBBox = (glyphName: keyof Glyphnames) => {
	const {bBoxNE, bBoxSW}= bravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
	const width = bBoxNE[0] - bBoxSW[0] 
	const height = bBoxNE[1] - bBoxSW[1]
	return {width, height};
}