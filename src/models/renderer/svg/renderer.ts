import Score from "../../score";
import glyphNames from "../../../smufl/metadata/glyphnames.json"
import bravuraMetadata from "../../../consts/bravura_metadata.json"
import SVGScore from "./score";

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	constructor(element: HTMLElement, score: Score){
		this.element = element;
		this.score = score;
		this.svg =  SVGRenderer.createSVGElement("svg");
		const svgScore = new SVGScore(this, score);
		this.svg.appendChild(svgScore.rootElement);
		element.appendChild(this.svg);
		document.fonts.ready.then(()=>{
			// this.setWidth();
			// this.setStave();
			this.setTranslate();
		});
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	static createUnicodeText = ({code, ...attributes} :{code: string, x?: number, y?: number, "text-anchor"?: string}) => {
		const text = SVGRenderer.createText(`&#x${code}`)
		Object.entries(attributes).forEach(([k, v])=>text.setAttribute(k, String(v)))
		return text
	}
	static setBBox = (element: SVGElement, {bBoxNE, bBoxSW}: {bBoxNE: number[], bBoxSW: number[]}) =>{
		const x = bBoxSW[0]
		const y = -bBoxNE[1]
		const width = bBoxNE[0] - bBoxSW[0]
		const height = bBoxNE[1] - bBoxSW[1]
		// element.setAttribute("x", String(x * 4))
		// element.setAttribute("y", String(y * 4 + 2))
		element.setAttribute("width", String(width*4))
		element.setAttribute("height", String(height * 4))
	}
	static createText (content: string) {
		const text = SVGRenderer.createSVGElement("text")
		text.innerHTML = content
		return text;
	};
	static createSMULFElement = (glyphName: string) =>{
		let codepoint
		// @ts-ignore
		codepoint = glyphNames?.[glyphName]?.codepoint
		// @ts-ignore
		if(!codepoint) codepoint = bravuraMetadata.ligatures?.[glyphName]?.codepoint

		const text = this.createUnicodeText({code: codepoint.replace('U+', '')})
		// @ts-ignore
		this.setBBox(text, bravuraMetadata.glyphBBoxes[glyphName])
		return text;
	}
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K) => document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
	private setTranslate = () => {
		const track = this.svg.querySelector("g[type='track']")
		if(!track) return;
		Array.from(track.children).forEach(text=>{
		const svgElement: SVGGElement = text as SVGGElement
		svgElement.transform.baseVal.appendItem(this.createTransform(0, 0))
		const prevText = text.previousElementSibling as SVGTextElement
		if(!prevText) return;
		const {e, f} = prevText.transform.baseVal.getItem(0).matrix;
		svgElement.transform.baseVal.clear();
		svgElement.transform.baseVal.appendItem(this.createTransform(e+Number(prevText.getAttribute("width")), f))
	})
}

}
export default SVGRenderer;