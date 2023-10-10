import * as R from "remeda"
import Score from "../../score";
import glyphNames from "../../../consts/metadata/glyphnames.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGScore from "./score";
import Glyphnames from "../../../consts/metadata/glyphnames.json";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	static svgRatio =  4;
	constructor(element: HTMLElement, score: Score){
		this.element = element;
		this.score = score;
		this.svg =  SVGRenderer.createSVGElement("svg");
		const svgScore = new SVGScore(this, score);
		this.svg.appendChild(svgScore.rootElement);
		element.appendChild(this.svg);
		this.setTranslate();
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	private setTranslate = () => {
		const track = this.svg.querySelector("g[type='track']")
		if(!track) return;
		Array.from(track.children).forEach(
			text=>{
			const svgElement: SVGGElement = text as SVGGElement
			svgElement.transform.baseVal.appendItem(this.createTransform(0, 0))
			const prevText = text.previousElementSibling as SVGTextElement
			if(!prevText) return;
			const {e, f} = prevText.transform.baseVal.getItem(0).matrix;
			svgElement.transform.baseVal.clear();
			svgElement.transform.baseVal.appendItem(this.createTransform(e+Number(prevText.getAttribute("width")), f))
		})
	}
	static createSMULFElement = (glyphName: keyof Glyphnames, attributes?: Parameters<typeof SVGRenderer.createSVGElement>[1]) =>{
		if(!(glyphName in bravuraMetadata.glyphBBoxes)) throw new Error(`${glyphName} not exist bravurametadata`);
		const text = this.createUnicodeText(glyphNames[glyphName].codepoint, attributes)
		return text;
	}
	static createSMULFLigurtureElement = (ligatureName: keyof bravuraMetadata["ligatures"], attributes?: Parameters<typeof SVGRenderer.createSVGElement>[1]) => {
		if(!(ligatureName in bravuraMetadata.glyphBBoxes)) throw new Error(`${ligatureName} not exist bravurametadata`);
		const text = this.createUnicodeText(bravuraMetadata.ligatures[ligatureName].codepoint, attributes)
		return text;
	}
	private static createUnicodeText = (code: string, attributes?: Parameters<typeof SVGRenderer.createSVGElement>[1] ) => {
		const text = SVGRenderer.createText(`&#x${code.replace('U+', '')}`, attributes)
		return text
	}
	private static createText (content: string, attributes?: Parameters<typeof SVGRenderer.createSVGElement>[1]) {
		const text = SVGRenderer.createSVGElement("text", attributes)
		text.innerHTML = content
		return text;
	};
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K, attributes: Record<string, unknown> = {}) => {
		const element = document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
		R.pipe(
			attributes,
			R.toPairs,
			R.forEach(([k, v])=> element.setAttribute(k, String(v)))
		)
		return element
	}
}
export default SVGRenderer;