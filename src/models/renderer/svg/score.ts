import Score from "../../score";
import { SMUFLGroup, SMUFLText } from "./interfaces";
import SVGRenderer from "./renderer";
import SVGTrack from "./track";

class SVGScore {
	rootElement = SVGRenderer.createSVGElement("g", {type: "score"});
	score: Score;
	svgRenderer: SVGRenderer;
	constructor (svgRenderer: SVGRenderer, score: Score){
		this.svgRenderer = svgRenderer
		this.score = score;
		this.rootElement.transform.baseVal.appendItem(this.svgRenderer.createTransform(0, 40));
		const a = score.tracks.map(track => SVGTrack(track))
		console.log(a)
		this.rootElement.appendChild(this.createSMULFElements(a[0]));
	}
	createSMULFElements = ({width, children, element, x, y, ...props}: SMUFLGroup) => {
			const g = SVGRenderer.createSVGElement(element, { width: width * SVGRenderer.svgRatio, ...props })
			g.transform.baseVal.appendItem(this.svgRenderer.createTransform((x ?? 0)* SVGRenderer.svgRatio, (y ?? 0) * SVGRenderer.svgRatio));

			children?.forEach((child)=> {
				if(child.element === "text"){
					const {x, y, width, height} = child
					const text = child as SMUFLText
					const {glyphName, ligatureName} = text
					if(glyphName) g.appendChild(SVGRenderer.createSMULFElement(glyphName, { x: (x ?? 0) * SVGRenderer.svgRatio, y: (y ?? 0) * SVGRenderer.svgRatio, width: width * SVGRenderer.svgRatio, height: height ?? 0 * SVGRenderer.svgRatio} ))
					if(ligatureName) g.appendChild(SVGRenderer.createSMULFLigurtureElement(ligatureName, { x: (x ?? 0) * SVGRenderer.svgRatio, y: (y ?? 0) * SVGRenderer.svgRatio, width: width * SVGRenderer.svgRatio, height: height ?? 0 * SVGRenderer.svgRatio} ))
				}
				if(child.element === "g"){
					const group = child as SMUFLGroup
					g.appendChild(this.createSMULFElements(group))
				}
			})
			return g
	}
}

export default SVGScore