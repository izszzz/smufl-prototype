import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"
import Note from "../../note";

class SVGNote {
	rootElement = SVGNote.setRootElement();
	svgRenderer: SVGRenderer;
	note: Note
	constructor(svgRenderer: SVGRenderer, note: Note){
		this.svgRenderer = svgRenderer
		this.note = note
	}
	static setRootElement(){
		const text =SVGRenderer.createUnicodeText(smufl.note.individual.quarterUp)
		text.setAttribute("type", "note");
		return text;
	}
}

export default SVGNote