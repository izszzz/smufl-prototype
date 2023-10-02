import Score from "../../score";
import smufl from "../../../consts/smufl.json"
import SVGScore from "./score";

class SVGRenderer{
	element: Element;
	score: Score
	svg: SVGSVGElement;
	constructor(element: Element, score: Score){
		this.element = element;
		this.score = score;
		this.svg = this.createSVG();
		const svgScore = new SVGScore(this);

		this.svg.appendChild(svgScore.rootElement);
		element.appendChild(this.svg);
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	static createUnicodeTextWithStave(content:{code: string, width: number}){
		const group = SVGRenderer.createSVGElement("g");
		const text = SVGRenderer.createUnicodeText(content);

		group.setAttribute("width", String(content.width));
		group.appendChild(text);

		const stave = Object.entries(smufl.staves.staff.fiveLines).map(([_, value])=> value).find(value => value.width === content.width);
		if(stave) group.appendChild( SVGRenderer.createUnicodeText(stave));
		return group
	}
	static createUnicodeText({code, width}: {code: string, width: number}){
		const text =SVGRenderer.createText(`&#x${code}`)
		text.setAttribute("width", String(width));
		text.addEventListener("loadeddata",()=>console.log("a"))
		return  text
	}
	static createText (content: string) {
		const text = SVGRenderer.createSVGElement("text")
		text.innerHTML = content
		return text;
	};
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K) => document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
	private createSVG = () =>  SVGRenderer.createSVGElement("svg");
}
export default SVGRenderer;