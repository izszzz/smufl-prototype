import SVGRenderer from "./renderer";
import glyphNames from "../../../smufl/metadata/glyphnames.json"
import classes from "../../../smufl/metadata/classes.json"
import bravuraMetadata from "../../../consts/bravura_metadata.json"
import SVGNote from "./note";
import Track from "../../track";

class SVGTrack {
	rootElement = SVGTrack.setRootElement();
	svgRenderer: SVGRenderer;
	track: Track;
	staveLines: 4 | 5 | 6 = 5;
	notes: SVGNote[] = [];
	constructor(svgRenderer: SVGRenderer, track: Track){
		this.svgRenderer = svgRenderer;
		this.track = track
		this.notes = track.notes.map(note =>new SVGNote(svgRenderer, note))

		const elements:SVGGElement[] = []
		elements.push(
			SVGRenderer.createSMULFElement("barlineSingle"),
			SVGRenderer.createSMULFElement("gClef"),
			SVGRenderer.createSMULFElement("timeSig4over4"),
			...this.notes.map(note=> note.rootElement),
			SVGRenderer.createSMULFElement("barlineFinal")
		);
		elements.forEach(el=>{
			this.rootElement.appendChild(el)
		});
		const a = classes.forTextBasedApplications
			.filter(staff => staff.includes(`staff${this.staveLines}Lines`))
			//@ts-ignore
			.map(key => ({[key]: bravuraMetadata.glyphAdvanceWidths[key]}))
		this.setStave()
		console.log(a)
	}
	private setStave = () => Array.from(this.rootElement.children).forEach(text=>{
		
		// control node
		const parent = text.parentNode
		const group = SVGRenderer.createSVGElement("g");
		parent?.replaceChild(group, text)
		group.appendChild(text)

		// TODO: fix
		const stave = classes.forTextBasedApplications
			.filter(staff => staff.includes(`staff${this.staveLines}Lines`))
			//@ts-ignore
			.map(key => ([key, bravuraMetadata.glyphAdvanceWidths[key]]))
			// bBoxの幅に4をかけるとちょうどよく表示される。
			.filter(([, value])=> Number(text.getAttribute("width")) <= value * 4)
			//@ts-ignore
			.reduce((accumulator, currentValue) => {
				if(!accumulator) return currentValue;
				// @ts-ignore
				return currentValue[1] < accumulator[0] ? currentValue : accumulator
			}, null)
			
			if(stave){
				const staveElement = SVGRenderer.createSMULFElement(stave[0])
				console.log(staveElement.getAttribute("width"))
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