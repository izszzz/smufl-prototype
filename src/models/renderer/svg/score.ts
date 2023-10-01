import SVGRenderer from "./renderer";
import SVGTrack from "./track";

class SVGScore {
	rootElement = SVGRenderer.createSVGElement("g");
	tracks: SVGTrack[] = [];
	svgRenderer: SVGRenderer;
	constructor (svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer
		const transform = svgRenderer.createTransform(0, 40)
		this.rootElement.transform.baseVal.appendItem(transform);
		this.tracks = [new SVGTrack(svgRenderer)]
		this.tracks.map(track => this.rootElement.appendChild(track.rootElement));
	}
}

export default SVGScore