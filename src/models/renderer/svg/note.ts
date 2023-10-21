import { SMUFL, SMUFLGroup} from "./smufl";
import { SMUFLNote } from "../../smufl/note";

export default function SVGNote(note: SMUFLNote): SMUFLGroup{
	const children = note.glyphs.map(glyph=>SMUFL.createText(glyph))	

	
	return {
		type: "note", 
		element: "g",
		x: note.x,
		y: note.y,
		width: note.width,
		children
	}
}