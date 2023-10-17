import * as R from "remeda"
import glyphNames from "../../../consts/metadata/glyphnames.json"
import SVGScore from "./score";
import Glyphnames from "../../../consts/metadata/glyphnames.json";
import Metadata from "../../../consts/metadata.json";
import { SMUFLGroup, SMUFLText } from "./smufl";
import { Score } from "../../core/score";
import { SMUFLScore } from "../../smufl/score";

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
		console.log(new SMUFLScore(this.score))
	}
	ajustSpacing = ({children: tracks}: SMUFLGroup) => {
		if(!tracks || tracks.length > 0) return;
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	createSMULFSVGElement = (glyphName: keyof Glyphnames, attributes?: Parameters<typeof this.createSVGElement>[1]) =>
		this.createUnicodeText(glyphNames[glyphName].codepoint, attributes)
	createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K, attributes: Record<string, unknown> = {}) => {
		const element = document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
		const fontSizeRatio = this.fontSize / Metadata.defaultFontSize
		if(qualifiedName === "g")
			(element as SVGGElement).transform.baseVal.appendItem(this.createTransform((attributes.x as number ?? 0) * fontSizeRatio, (attributes.y as number ?? 0) * fontSizeRatio));
		R.pipe(
			attributes,
			R.mapValues((v, k)=> ["x", "y", "width", "height"].includes(k) && R.isNumber(v) ? v * fontSizeRatio : v),
			R.toPairs,
			R.forEach(([k, v])=> element.setAttribute(k, String(v)))
		)
		return element
	}
	private upsertSVGElement = () => {
		while (this.element.firstChild) this.element.firstChild.remove()
		this.element
			.appendChild(this.svg)
			.appendChild(this.createSMULFElements(SVGScore(new SMUFLScore(this.score))));
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
					g.appendChild(this.createSMULFSVGElement(glyphName, props))
				}
				if(child.element === "g")
					g.appendChild(this.createSMULFElements(child as SMUFLGroup))
			})
			return g
	}
	private createSVGScore=(smuflScore: SMUFLScore)=>{
		smuflScore.smuflTracks.map(
			track=>
				track.smuflBars.map(bar=>
					bar.smuflNotes.map(note => {
						
					})
				)
		)
	}
}
export default SVGRenderer;