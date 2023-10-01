import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"

class SVGNote {
	rootElement = SVGRenderer.createSVGElement("g");
	svgRenderer: SVGRenderer;
	unicode: string = smufl.note.individual.quarterUp;
	constructor(svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer
	}
}

export default SVGNote