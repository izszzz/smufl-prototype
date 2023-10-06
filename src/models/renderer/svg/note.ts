import SVGRenderer from "./renderer";
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Note from "../../note";
import Classes from "../../../consts/metadata/classes.json";

class SVGNote {
	rootElement 
	note: Note;
	accidental?: Classes["accidentals"][number];
	combiningStaffPositions: Classes["combiningStaffPositions"][number] = "noteQuarterUp";
	static defaultY = 4; // ド
	static defaultPitch = 60; // midiのドは60
	static baseWhiteKeys = [0, 2, 4, 5, 7, 9, 11]
	static baseOctaveKeys = [...Array(12)].map((_,i)=>i)
	constructor(note: Note){
		this.note = note
		this.rootElement =  this.setRootElement();
	}

	setRootElement(){
		const group = SVGRenderer.createSVGElement("g")
		const note =SVGRenderer.createSMULFElement(this.combiningStaffPositions)
		note.setAttribute("type", "note")
		group.setAttribute("width", String(note.getAttribute("width")))
		group.setAttribute("type", "note")
		group.setAttribute("transform", `translate(0 ${(this.calcNoteY())})`)
		group.appendChild(note)

		if(this.accidental){
			const accidental = SVGRenderer.createSMULFElement(this.accidental)
			accidental.setAttribute("type", "accidental")
			group.appendChild(accidental)
		}

		return group 
	}

	calcNoteY (): number{
		const noteStep = bravuraMetadata.engravingDefaults.thickBarlineThickness * SVGRenderer.svgRatio
		const ajustedPitch = this.ajustPitch()
		return SVGNote.defaultY - (this.calcWhiteKeyPosition(ajustedPitch) + SVGNote.calcOctaveY(ajustedPitch)) * noteStep
	}

	private ajustPitch = (): number => this.note.pitch - SVGNote.defaultPitch
	private calcWhiteKeyPosition = (ajustedPitch: number) => {
		if(SVGNote.baseWhiteKeys.includes(ajustedPitch)) 
			return SVGNote.baseWhiteKeys.indexOf(ajustedPitch);
		if(!this.note.prevNote) 
			return SVGNote.baseWhiteKeys.indexOf(SVGNote.baseOctaveKeys.indexOf(ajustedPitch) - 1) // 前のノートが見つからない場合はシャープ表示にする  
		if(this.note.prevNote.pitch  < this.note.pitch) {
			this.accidental = "accidentalSharp"
			return SVGNote.baseWhiteKeys.indexOf(SVGNote.baseOctaveKeys.indexOf(ajustedPitch) - 1)
		} else {
			this.accidental = "accidentalFlat"
			return SVGNote.baseWhiteKeys.indexOf(SVGNote.baseOctaveKeys.indexOf(ajustedPitch) + 1)
		}
	}
	static calcBasePitch = (ajustedPitch: number): number => ajustedPitch % SVGNote.baseOctaveKeys.length
	static calcOctave = (ajustedPitch: number): number => Math.trunc(ajustedPitch / SVGNote.baseOctaveKeys.length)
	static calcOctaveY = (ajustedPitch: number): number => SVGNote.calcOctave(ajustedPitch) * (SVGNote.baseWhiteKeys.length + 1)
	// TODO: migrate midi importer
	static calcNoteValue=(ticks: number) => 1920 / ticks 
}

export default SVGNote