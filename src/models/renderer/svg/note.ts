import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"
import Note from "../../note";

class SVGNote {
	rootElement 
	svgRenderer: SVGRenderer;
	note: Note;
	constructor(svgRenderer: SVGRenderer, note: Note){
		this.svgRenderer = svgRenderer
		this.note = note
		this.rootElement =  this.setRootElement();
	}
	setRootElement(){
		const note = Object.entries(smufl.note.individual).map(([,v])=>v).find(v=>v.value===SVGNote.calcNoteValue(this.note.durationTicks))?.quarterUp
		if(!note) return SVGRenderer.createSVGElement("g");
		const text =SVGRenderer.createUnicodeText(note)
		text.setAttribute("type", "note");
		return text;
	}
	// TODO: migrate midi importer
	static calcNoteValue(ticks: number) {
		return 1920 / ticks 
	}
}

export default SVGNote