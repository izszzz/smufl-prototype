import Score from "../../score";
import SVGRenderer from "./renderer";
import SVGTrack from "./track";

class SVGScore {
	rootElement = this.setRootElement();
	tracks: SVGTrack[] = [];
	score: Score;
	svgRenderer: SVGRenderer;
	constructor (svgRenderer: SVGRenderer, score: Score){
		this.svgRenderer = svgRenderer
		this.rootElement.transform.baseVal.appendItem(this.svgRenderer.createTransform(0, 40));
		this.score = score;
		this.tracks = score.tracks.map(track=>new SVGTrack(svgRenderer, track))
		console.log(this.tracks);
		this.tracks.map(track => this.rootElement.appendChild(track.rootElement));
	}
	setRootElement(){
		const group = SVGRenderer.createSVGElement("g")
		group.setAttribute("type", "score");
		return group
	}
}

export default SVGScore