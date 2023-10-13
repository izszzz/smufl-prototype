import * as R from "remeda"
import Score from "../../score";
import glyphNames from "../../../consts/metadata/glyphnames.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGScore from "./score";
import Glyphnames from "../../../consts/metadata/glyphnames.json";
import Metadata from "../../../consts/metadata.json";
import { SMUFLGroup, SMUFLText } from "./interfaces";

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	layoutMode: "page" | "scroll" = "page"
	fontSize = 30;
	static svgRatio =  4;
	constructor(element: HTMLElement, score: Score){
		this.element = element;
		this.score = score;
		this.svg = this.createSVGElement(
			"svg", 
			{ 
				width: "100%", 
				"font-size": this.fontSize
			}
		);
		this.svg.appendChild(this.createSMULFElements(SVGScore(score)));
		element.appendChild(this.svg);
		this.svg.addEventListener("resize", ()=>{console.log("resize")})
	}
	layout(){

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
	private createUnicodeText = (code: string, attributes?: Parameters<typeof this.createSVGElement>[1] ) => 
		 this.createText(code.replace('U+', '&#x'), attributes)
	private createText (content: string, attributes?: Parameters<typeof this.createSVGElement>[1]) {
		const text = this.createSVGElement("text", attributes)
		text.innerHTML = content
		return text;
	};
	private createSMULFElements = ({width, children, element, ...props}: SMUFLGroup) => {
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