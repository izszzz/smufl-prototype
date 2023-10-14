import * as R from "remeda"
import Score from "../../score";
import glyphNames from "../../../consts/metadata/glyphnames.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGScore from "./score";
import Glyphnames from "../../../consts/metadata/glyphnames.json";
import Metadata from "../../../consts/metadata.json";
import { SMUFLGroup, SMUFLText } from "./interfaces";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	layoutMode: "page" | "scroll" = "page"
	fontSize = 30;
	fontSizeRatio = this.fontSize / Metadata.defaultFontSize
	static svgRatio =  4;
	constructor(element: HTMLElement, score: Score){
		this.element = element;
		this.score = score;
		this.svg = this.createSVGElement(
			"svg", 
			{ 
				width: "100%", 
				height: "100%",
				"font-size": this.fontSize
			}
		);
		this.upsertSVGElement();
		// const resizeObserver = new ResizeObserver(([entrie])=>{
		// 	if(svgScore.width * this.fontSizeRatio >= entrie.contentRect.width){
		// 		console.log(entrie,"aaaaaaaaaaa")
		// 	}
		// })
		// resizeObserver.observe(this.svg)
	}
	ajustSpacing = ({children}: SMUFLGroup) => {
		if(!children || children.length > 0) return;
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	createSMULFElement = (glyphName: keyof Glyphnames, attributes?: Parameters<typeof this.createSVGElement>[1]) =>{
		if(!(glyphName in bravuraMetadata.glyphBBoxes)) throw new Error(`${glyphName} not exist bravurametadata`);
		const text = this.createUnicodeText(glyphNames[glyphName].codepoint, attributes)
		return text;
	}
	createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K, attributes: Record<string, unknown> = {}) => {
		const element = document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
		const fontSizeRatio = this.fontSize / Metadata.defaultFontSize
		if(qualifiedName === "g")
			(element as SVGGElement).transform.baseVal.appendItem(this.createTransform((attributes.x as number ?? 0) * fontSizeRatio, (attributes.y as number ?? 0) * fontSizeRatio));
		R.pipe(
			attributes,
			R.mapValues((value, key)=> ["x", "y", "width", "height"].includes(key) && typeof value === "number" ? value as number * fontSizeRatio : value),
			R.toPairs,
			R.forEach(([k, v])=> element.setAttribute(k, String(v)))
		)
		return element
	}
	static getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const {bBoxNE, bBoxSW}= BravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
		const width = bBoxNE[0] - bBoxSW[0] 
		const height = bBoxNE[1] - bBoxSW[1]
		return {width, height};
	}
	private upsertSVGElement = () => {
		while (this.element.firstChild) this.element.firstChild.remove()
		this.svg.appendChild(this.createSMULFElements(SVGScore(this.score)));
		this.element.appendChild(this.svg);
	}
	private createUnicodeText = (code: string, attributes?: Parameters<typeof this.createSVGElement>[1] ) => 
		 this.createText(code.replace('U+', '&#x'), attributes)
	private createText (content: string, attributes?: Parameters<typeof this.createSVGElement>[1]) {
		const text = this.createSVGElement("text", attributes)
		text.innerHTML = content
		return text;
	};
	private createSMULFElements = ({ children, element, ...props}: SMUFLGroup) => {
			const g = this.createSVGElement(element, props)
			children?.forEach((child)=> {
				if(child.element === "text") {
					const { glyphName, type, element, ...props } = child as SMUFLText
					g.appendChild(this.createSMULFElement(glyphName, props))
				}
				if(child.element === "g")
					g.appendChild(this.createSMULFElements(child as SMUFLGroup))
			})
			return g
	}
}
export default SVGRenderer;