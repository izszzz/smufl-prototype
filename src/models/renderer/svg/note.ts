import SVGRenderer from "./renderer";
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Note from "../../note";
import Classes from "../../../consts/metadata/classes.json";

class SVGNote {
	rootElement 
	note: Note;
	static defaultY = 4; // ド
	static defaultPitch = 60; // midiのドは60
	static baseWhiteKeys = [0, 2, 4, 5, 7, 9, 11]
	static oneOctaveKeyCount = 12
	combiningStaffPositions: Classes["combiningStaffPositions"][number] = "noteQuarterUp";
	constructor(note: Note){
		this.note = note
		this.rootElement =  this.setRootElement();
	}

	setRootElement(){
		const text =SVGRenderer.createSMULFElement(this.combiningStaffPositions)
		text.setAttribute("type", "note")
		text.setAttribute("y", String(this.calcNoteY()))
		return text
	}

	calcNoteY (): number{
		const noteStep = bravuraMetadata.engravingDefaults.thickBarlineThickness * 4
		const ajustedPitch = this.ajustPitch()
		const whiteKeyIndex = SVGNote.getWhiteKeyIndex(ajustedPitch)
		return SVGNote.defaultY - (whiteKeyIndex + SVGNote.calcOctaveY(ajustedPitch)) * noteStep
	}

	private ajustPitch = (): number => this.note.pitch - SVGNote.defaultPitch
	static calcBasePitch = (ajustedPitch: number): number => ajustedPitch % SVGNote.oneOctaveKeyCount
	static calcOctave = (ajustedPitch: number): number => Math.trunc(ajustedPitch / SVGNote.oneOctaveKeyCount)
	static calcOctaveY = (ajustedPitch: number): number => SVGNote.calcOctave(ajustedPitch) * (SVGNote.baseWhiteKeys.length + 1)
	static getWhiteKeyIndex = (ajustedPitch: number) => SVGNote.baseWhiteKeys.indexOf(ajustedPitch)
	// TODO: migrate midi importer
	static calcNoteValue(ticks: number) {
		return 1920 / ticks 
	}
}

export default SVGNote