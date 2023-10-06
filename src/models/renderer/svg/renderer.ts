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
		document.fonts.ready.then(()=>{
			this.setTranslate();
		});
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	static createUnicodeText = ({code, ...attributes} :{code: string, x?: number, y?: number, "text-anchor"?: string}) => {
		const text = SVGRenderer.createText(`&#x${code.replace('U+', '')}`)
		Object.entries(attributes).forEach(([k, v])=>text.setAttribute(k, String(v)))
		return text
	}
	static setBBox = (element: SVGElement, {bBoxNE, bBoxSW}: {bBoxNE: number[], bBoxSW: number[]}) =>{
		const width = bBoxNE[0] - bBoxSW[0]
		const height = bBoxNE[1] - bBoxSW[1]
		element.setAttribute("width", String(width * SVGRenderer.svgRatio))
		element.setAttribute("height", String(height * SVGRenderer.svgRatio))
	}
	static createText (content: string) {
		const text = SVGRenderer.createSVGElement("text")
		text.innerHTML = content
		return text;
	};
	static createSMULFElement = (glyphName: keyof Glyphnames) =>{
		const text = this.createUnicodeText({code: glyphNames[glyphName].codepoint})
		if(glyphName in bravuraMetadata.glyphBBoxes)
			this.setBBox(text, bravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]])
		return text;
	}
	static createSMULFLigurtureElement = (ligatureName: keyof bravuraMetadata["ligatures"]) => {
		const text = this.createUnicodeText({code: bravuraMetadata.ligatures[ligatureName].codepoint})
		this.setBBox(text, bravuraMetadata.glyphBBoxes[ligatureName])
		return text;
	}
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K) => document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
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

}
export default SVGRenderer;