import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"

class SVGNote {
	rootElement;
	svgRenderer: SVGRenderer;
	constructor(svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer
		this.rootElement = SVGRenderer.createUnicodeTextWithStave(smufl.note.individual.quarterUp)
	}
}

export default SVGNote