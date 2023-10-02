import Score from "../../score";
import smufl from "../../../consts/smufl.json"
import SVGScore from "./score";

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	constructor(element: HTMLElement, score: Score){
		this.element = element;
		this.score = score;
		this.svg = this.createSVG();
		const svgScore = new SVGScore(this, score);
		this.svg.appendChild(svgScore.rootElement);
		element.appendChild(this.svg);
		this.setWidth();
		this.setStave();
		this.setTranslate();
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
	static createText (content: string) {
		const text = SVGRenderer.createSVGElement("text")
		text.innerHTML = content
		return text;
	};
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K) => document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
	private createSVG = () =>  SVGRenderer.createSVGElement("svg");
	private setWidth = () => this.svg.querySelectorAll("text").forEach(text=>text.setAttribute("width", String(text.getComputedTextLength())))
	private setStave = () => this.svg.querySelectorAll("text").forEach(text=>{
		// control node
		const parent = text.parentNode
		const group = SVGRenderer.createSVGElement("g");
		parent?.replaceChild(group, text)
		group.appendChild(text)

		// set stave
		const textWidth = Number(text.getAttribute("width"))
		const stave = Object.entries(smufl.staves.staff.fiveLines).map(([, v])=>v).filter(({width})=>textWidth <= width).reduce((accumulator, currentValue)=> {
			return currentValue.width < accumulator.width ? currentValue : accumulator
		})
		const staveElement = SVGRenderer.createUnicodeText(stave)
		group.appendChild(staveElement)
		group.setAttribute("width", String(staveElement.getComputedTextLength()));
	}) 
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