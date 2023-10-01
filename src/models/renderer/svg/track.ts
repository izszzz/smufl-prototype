import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"

class SVGTrack{
	rootElement = SVGRenderer.createSVGElement("g");
	elements: SVGElement[] = [];
	width = 0;
	svgRenderer: SVGRenderer;
	constructor(svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer;
		this.rootElement.appendChild(SVGRenderer.createUnicodeText(smufl.barLines.single))
		this.rootElement.appendChild(this.addPaddingLeft(this.createGClef(4, 0), 0, 0));
		this.rootElement.appendChild(this.addPaddingLeft(this.createFourOverFour(4, 0), 16, 0));
		this.elements.push(
			SVGRenderer.createUnicodeText(smufl.barLines.single), 
			this.createNarrowSpace(),
			this.createGClef(0, 0),
			this.createFourOverFour(0, 0)
		);
		const element = this.rootElement.firstChild?.nextSibling as SVGGElement;
		console.log(element as SVGGElement)
		console.log(element.transform.baseVal.getItem(0))
	}
	createGClef = (x: number, y:number) => {
		const group = SVGRenderer.createSVGElement("g");
		const text = SVGRenderer.createUnicodeText(smufl.clefs.gClef.code);
		const stave = SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.wide.code);
		const transform = this.svgRenderer.createTransform(x, y)
		group.transform.baseVal.appendItem(transform)
		group.appendChild(text);
		group.appendChild(stave);
		return group
	}
	createFourOverFour = (x: number, y: number) =>{
		const group = SVGRenderer.createSVGElement("g");
		const text = SVGRenderer.createUnicodeText(smufl.timeSignatures.fourOverFour);
		const stave = SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.default.code);
		const transform = this.svgRenderer.createTransform(x, y)
		group.transform.baseVal.appendItem(transform)
		group.appendChild(text);
		group.appendChild(stave);
		return group
	}
	createNarrowSpace = () => SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow.code)
	addPaddingLeft = (element: SVGElement, x: number, y:number) => {
		const group = SVGRenderer.createSVGElement("g");
		group.appendChild(SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow.code));
		group.appendChild(element);
		const transform = this.svgRenderer.createTransform(x, y)
		group.transform.baseVal.appendItem(transform)
		return group
	}
}

export default SVGTrack