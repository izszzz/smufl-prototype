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

		// const track = this.createTrack();
		// const root = this.createRoot();
		// this.svg.appendChild(root).appendChild(track);
		const svgScore = new SVGScore(this);
		this.svg.appendChild(svgScore.rootElement);

		element.appendChild(this.svg);
	}
	private createRoot = () =>{
		const group = this.createGroup()
		group.setAttribute("transform", "translate(2 40)")	
		return group
	}
	private createTrack = () => {
		let x = 0;
		const group = this.createGroup()
		const barLine = SVGRenderer.createText(`&#x${smufl.barLines.single}`)

		x += smufl.staves.staff.fiveLines.narrow.width
		const narrowFiveLines = SVGRenderer.createText(`&#x${smufl.staves.staff.fiveLines.narrow.code}`)

		const wideFiveLines = SVGRenderer.createText(`&#x${smufl.staves.staff.fiveLines.wide.code}`)
		wideFiveLines.setAttribute("transform", `translate(${x} 0)`);

		const gClef = SVGRenderer.createText(`&#x${smufl.clefs.gClef.code}`)
		gClef.setAttribute("transform", `translate(${x} -4)`);

		x += smufl.staves.staff.fiveLines.wide.width
		const fourOverFour = SVGRenderer.createText(`&#x${smufl.timeSignatures.fourOverFour}`)
		fourOverFour.setAttribute("transform", `translate(${x} 0)`);

		const defaultFiveLines = SVGRenderer.createText(`&#x${smufl.staves.staff.fiveLines.default.code}`)
		defaultFiveLines.setAttribute("transform", `translate(${x} 0)`);

		group.appendChild(barLine);
		group.appendChild(narrowFiveLines);
		group.appendChild(wideFiveLines);
		group.appendChild(gClef);
		group.appendChild(fourOverFour);
		group.appendChild(defaultFiveLines)
		return group
	}
	private createSVG = () =>  SVGRenderer.createSVGElement("svg");
	private createGroup = () => SVGRenderer.createSVGElement("g");
	
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	static createUnicodeText(unicode: string){
		return SVGRenderer.createText(`&#x${unicode}`)
	}
	static createText (content: string) {
		const text = SVGRenderer.createSVGElement("text")
		text.innerHTML = content
		return text;
	};
	static createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K) => document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
}
export default SVGRenderer;