import * as R from 'remeda';
import SVGRenderer from "./renderer";
import classes from "../../../consts/metadata/classes.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGNote from "./note";
import Track from "../../track";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";

class SVGTrack {
	rootElement = SVGTrack.setRootElement();
	track: Track;
	static staffLines: 1 | 2 | 3 | 4 | 5 | 6 = 5;
	notes: SVGNote[] = [];
	constructor( track: Track){
		this.track = track
		console.log(track)
		this.notes = track.notes.map(note =>new SVGNote(note))

		const elements:SVGGElement[] = []
		elements.push(
			SVGRenderer.createSMULFElement("barlineSingle"),
			SVGRenderer.createSMULFElement("gClef"),
			SVGRenderer.createSMULFLigurtureElement("timeSig4over4"),
			...this.notes.map(note=> note.rootElement),
			SVGRenderer.createSMULFElement("barlineFinal")
		);
		elements.forEach(el=>{ this.rootElement.appendChild(el) });
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
		const staff = R.pipe(
			classes.forTextBasedApplications,	
			R.filter(staff => staff.includes( `staff${SVGTrack.staffLines}Lines`)),
			R.map((key) => ({
				 key, width: bravuraMetadata.glyphAdvanceWidths[key as keyof BravuraMetadata["glyphAdvanceWidths"]]
			})),
			R.filter(({width})=> textWidth <= width * 4 ),
			R.minBy((x) => x.width)
		)
		if (staff){
			const staveElement = SVGRenderer.createSMULFElement(staff.key)
			group.appendChild(staveElement)
			group.setAttribute("width", String(staveElement.getAttribute("width")));
		}
	}) 
	static setRootElement(){
		const group= SVGRenderer.createSVGElement("g")
		group.setAttribute("type", "track");
		return group;
	}
}

export default SVGTrack