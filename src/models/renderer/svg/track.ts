import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"

class SVGTrack{
	element = SVGRenderer.createSVGElement("g");
	width = 0;
	constructor(){
		this.element.appendChild(SVGRenderer.createUnicodeText(smufl.barLines.single))
		this.element.appendChild(this.addPaddingLeft(this.createGClef()));
	}
	createGClef = () => SVGRenderer.createUnicodeText(smufl.clefs.gClef.code);
	addPaddingLeft = (element: SVGElement) => {
		const group = SVGRenderer.createSVGElement("g");
		group.appendChild(SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow.code));
		group.appendChild(element)
		return group
	}
}

export default SVGTrack