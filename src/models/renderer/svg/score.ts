import Score from "../../score";
import SVGRenderer from "./renderer";
import SVGTrack from "./track";

class SVGScore {
	rootElement = SVGRenderer.createSVGElement("g", {type: "score"});
	tracks: SVGTrack[] = [];
	score: Score;
	svgRenderer: SVGRenderer;
	constructor (svgRenderer: SVGRenderer, score: Score){
		this.svgRenderer = svgRenderer
		this.score = score;
		this.rootElement.transform.baseVal.appendItem(this.svgRenderer.createTransform(0, 40));
		this.tracks = score.tracks.map(track=>new SVGTrack(track, svgRenderer))
		this.tracks.map(track => this.rootElement.appendChild(track.rootElement));
	}
}

export default SVGScore