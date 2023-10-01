import SVGRenderer from "./renderer";
import SVGTrack from "./track";

class SVGScore {
	element = SVGRenderer.createSVGElement("g");
	tracks: SVGTrack[] = [];
	svgRenderer: SVGRenderer;
	constructor (svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer
		const transform = svgRenderer.svg.createSVGTransform()
		transform.setTranslate(0, 40);
		this.element.transform.baseVal.appendItem(transform);
		this.tracks = [new SVGTrack()]
		this.tracks.map(track => this.element.appendChild(track.element));
	}
}

export default SVGScore