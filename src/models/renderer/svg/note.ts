import { SMUFL, SMUFLElement, SMUFLGroup} from "./smufl";
import { SMUFLNote } from "../../smufl/note";

export default function SVGNote(note: SMUFLNote): SMUFLGroup{
	const children: SMUFLElement[] = []
	const pureNote = [SMUFL.createText({ glyphName: note.individualNote})]
	const noteBBox = SMUFL.getBBoxByGlyphName(note.individualNote)
	
	if(note.accidental)
		children.push(SMUFL.createText({ type: "accidental", glyphName: note.accidental}))
	if(note.legerLine)
		pureNote.push(SMUFL.createText({ type: "legerLine", glyphName: note.legerLine}))

	children.push({ element: "g", ...noteBBox, children: pureNote } as SMUFLGroup)
	
	return {
		type: "note", 
		element: "g",
		y: note.y,
		width: children.reduce((acc, item)=>acc + item.width, 0),
		children: children.map((child, i, array) => array[i-1] ? {...child, x: array[i-1].width}: child)
	}
}