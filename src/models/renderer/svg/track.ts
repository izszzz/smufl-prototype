import * as R from 'remeda';
import SVGRenderer from "./renderer";
import classes from "../../../consts/metadata/classes.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import  SVGNote  from "./note";
import Track from "../../track";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";

class SVGTrack {
	rootElement = SVGRenderer.createSVGElement("g", {type: "track"});
	track: Track;
	static staffLines: 1 | 2 | 3 | 4 | 5 | 6 = 5;
	constructor(track: Track, svgRenderer: SVGRenderer){
		this.track = track
		const a = track.notes.map(note => SVGNote(note))
		const elements:SVGGElement[] = []
		elements.push(
			SVGRenderer.createSMULFElement("barlineSingle"),
			SVGRenderer.createSMULFElement("gClef"),
			SVGRenderer.createSMULFLigurtureElement("timeSig4over4"),
			...a.map(({type, y, width, children})=> {
				const e = SVGRenderer.createSVGElement("g", {type, width: String(width * SVGRenderer.svgRatio) })
				e.transform.baseVal.appendItem(svgRenderer.createTransform(0, y * SVGRenderer.svgRatio));

				children.forEach(({x, width, height, glyphName})=>{
					e.appendChild(SVGRenderer.createSMULFElement(glyphName, { x: String((x ?? 0) * SVGRenderer.svgRatio),width: String(width * SVGRenderer.svgRatio), height: String(height ?? 0 * SVGRenderer.svgRatio)} ))
				})
				return e
			}),
			SVGRenderer.createSMULFElement("barlineFinal")
		);
		elements.forEach(el=> this.rootElement.appendChild(el));
		this.setStave()
	}
	private setStave = () => Array.from(this.rootElement.children).forEach(text=>{
		// control node
		const parent = text.parentNode
		const group = SVGRenderer.createSVGElement("g");
		const textWidth = Number(text.getAttribute("width"))
		parent?.replaceChild(group, text)
		group.appendChild(text)
		
		// calc staff type
		const staffLines = R.pipe(
			classes.forTextBasedApplications,	
			R.filter(staff => staff.includes( `staff${SVGTrack.staffLines}Lines`)),
			R.map((key) => ({
				 key, width: bravuraMetadata.glyphAdvanceWidths[key as keyof BravuraMetadata["glyphAdvanceWidths"]]
			})),
		)
		const staff = R.pipe(
			staffLines,
			R.filter(({width})=> textWidth <= width * SVGRenderer.svgRatio ),
			R.minBy((x) => x.width)
		)
		const staveElement = SVGRenderer.createSMULFElement(staff?.key ?? "staff5LinesWide")
		group.appendChild(staveElement)
		group.setAttribute("width", String(staveElement.getAttribute("width")));
	}) 
}

export default SVGTrack