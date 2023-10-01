import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"
import SVGNote from "./note";

class SVGTrack {
	rootElement = SVGRenderer.createSVGElement("g");
	svgRenderer: SVGRenderer;
	notes: SVGNote[] =[];
	constructor(svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer;
		const elements:({unicode: string, width: number})[] = []
		this.notes = [new SVGNote(svgRenderer)]

		elements.push(
			{unicode: smufl.barLines.single, width: 0}, 
			{unicode: smufl.staves.staff.fiveLines.narrow.code, width: smufl.staves.staff.fiveLines.narrow.width},
			{unicode: smufl.staves.staff.fiveLines.wide.code, width: 0},
			{unicode: smufl.clefs.gClef.code, width: smufl.staves.staff.fiveLines.wide.width},
			{unicode: smufl.staves.staff.fiveLines.narrow.code, width: smufl.staves.staff.fiveLines.narrow.width},
			{unicode: smufl.staves.staff.fiveLines.default.code, width: 0},
			{unicode: smufl.timeSignatures.fourOverFour.code, width: smufl.staves.staff.fiveLines.default.width},
			{unicode: smufl.staves.staff.fiveLines.narrow.code, width: smufl.staves.staff.fiveLines.narrow.width},
			// TODO: staveとnoteを連動させる
			{unicode: smufl.staves.staff.fiveLines.default.code, width: 0},
			...this.notes.map(note=>(
				{unicode: note.unicode, width: smufl.staves.staff.fiveLines.default.width}
			))
		);

		elements.forEach((el)=>{
			const element=SVGRenderer.createUnicodeText(el.unicode)
			element.transform.baseVal.appendItem(this.svgRenderer.createTransform(0, 0))
			element.setAttribute("width", String(el.width));
			this.rootElement.appendChild(element)

			const prev = element.previousSibling as SVGGElement | null
			if (!prev) return;
			const {e, f} = prev.transform.baseVal.getItem(0).matrix;
			element.transform.baseVal.clear();
			element.transform.baseVal.appendItem(this.svgRenderer.createTransform(e + Number(prev.getAttribute("width")), f))
		});
		this.notes.map(note => this.rootElement.appendChild(note.rootElement))
	}
}

export default SVGTrack