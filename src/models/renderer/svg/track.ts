import SVGRenderer from "./renderer";
import * as R from 'remeda';
import classes from "../../../consts/metadata/classes.json"
import SVGNote from "./note";
import Track from "../../track";

class SVGTrack {
	rootElement = SVGTrack.setRootElement();
	track: Track;
	static staffLines: 1 | 2 | 3 | 4 | 5 | 6 = 5;
	notes: SVGNote[] = [];
	constructor( track: Track){
		this.track = track
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
		parent?.replaceChild(group, text)
		group.appendChild(text)

		const staff = R.pipe(
			classes.forTextBasedApplications,	
			R.find(staff => R.equals(staff, `staff${SVGTrack.staffLines}Lines`))
		)
		if (staff){
			const staveElement = SVGRenderer.createSMULFElement(staff)
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