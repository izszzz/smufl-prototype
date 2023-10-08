import * as R from "remeda"
import SVGRenderer from "./renderer";
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Note from "../../note";
import Classes from "../../../consts/metadata/classes.json";

type NOTE_FRACTION = "Whole" | "Half" | "Quarter" | "8th" | "16th"
class SVGNote {
	note: Note;

	/** 
	 * @type {SVGGElement} root svg group element.
	 */
	rootElement: SVGGElement = SVGRenderer.createSVGElement("g", {type: "note"}); 

	/** 
	 * @type {number} svg note pitch
	 * 0 equal Middle C 
	 */
	pitch: number;

	/**
	 * @type {number} SVGNote Y-Axis
	 * 音符のsvgを配置した際の初期位置がミの位置なので、それをドの位置に移動する
	 */
	y: number = 2 * bravuraMetadata.engravingDefaults.thickBarlineThickness * SVGRenderer.svgRatio

	/**
	 * @type {string} smufl claases.accidentals literal.
	 */
	accidental?: Classes["accidentals"][number];

	/**
	 * @type {60} midi middle C
	 */
	static midiMiddleC: number = 60; 

	/**
	 * @type {number} 1オクターブに含まれる白鍵の数とインデックス 
	 */
	static baseWhiteKeys = [0, 2, 4, 5, 7, 9, 11]

	/**
	 * @type {number} 1オクターブに含まれる鍵盤の数とインデックス
	 */
	static baseOctaveKeys = [...Array(12)].map((_,i)=>i)

	constructor(note: Note, svgRenderer: SVGRenderer){
		this.note = note
		this.pitch = SVGNote.calcAjustPitch(note.pitch);
		this.setRootElement();
		this.rootElement.setAttribute("width", String(this.calcWidth()))
		this.rootElement.transform.baseVal.appendItem(svgRenderer.createTransform(0, this.calcSVGNoteY()));
	}

	private setRootElement(){
		const note = SVGRenderer.createSMULFElement(this.searchNoteGlyphName())
		if(SVGNote.isAccidental(this.note.pitch)) {
			this.calcAccidental()
			const accidental = SVGRenderer.createSMULFElement(this.accidental ?? "accidentalSharp", { type: "accidental" })
			const accidentalWidth = accidental.getAttribute("width")
			if(accidentalWidth) note.setAttribute("x", accidentalWidth)
			this.rootElement.appendChild(accidental)
		}
		this.rootElement.appendChild(note)
	}
	private calcAccidental(){
		this.accidental = 
			!this.note.prevNote ? "accidentalSharp" :
			this.note.prevNote.pitch < this.note.pitch ? "accidentalSharp" : "accidentalFlat"
	}
	private calcSVGNoteY =(): number =>
		this.y - (this.calcWhiteKeyPosition(this.pitch) + SVGNote.calcOctaveY(this.pitch)) * bravuraMetadata.engravingDefaults.thickBarlineThickness * SVGRenderer.svgRatio
	private calcWidth = () =>
		R.reduce(
			Array.from(this.rootElement.children),
			(acc, item)=> acc + Number(item.getAttribute("width") ?? 0),
			0
		)
	private calcWhiteKeyPosition = (pitch: number): number => {
		let calcPitch = pitch
		if(this.accidental === "accidentalSharp") calcPitch -= 1
		if(this.accidental === "accidentalFlat") calcPitch +=1
		return SVGNote.baseWhiteKeys.indexOf(SVGNote.baseOctaveKeys.indexOf(calcPitch));
	}
	private searchNoteGlyphName(){
		return Classes.forTextBasedApplications
			.filter((glyphName) => glyphName.includes("note"))	
			.filter((noteGlyphName) => noteGlyphName.includes(String(SVGNote.calcNoteFraction(this.note.durationTicks))))
			.filter((noteGlyphName) => noteGlyphName.includes(String(SVGNote.calcNoteStem(this.pitch))))[0]
	}
	private static isAccidental = (pitch: number) =>!SVGNote.baseWhiteKeys.includes(SVGNote.calcBasePitch(pitch))
	private static calcBasePitch = (pitch: number): number => pitch % SVGNote.baseOctaveKeys.length
	private static calcAjustPitch = (pitch: number): number => pitch - SVGNote.midiMiddleC
	private static calcOctave = (pitch: number): number => Math.trunc(pitch / SVGNote.baseOctaveKeys.length)
	private static calcOctaveY = (pitch: number): number => SVGNote.calcOctave(pitch) * (SVGNote.baseWhiteKeys.length + 1)
	private static calcNoteFraction = (durationTicks: number): NOTE_FRACTION => { 
		// 480はmidi ticksにおける四分音符の長さ
		// 4 は4拍 TODO: Trackに
		const fraction = 480 * 4 / durationTicks 
		if (fraction === 2) return "Half"
		if (fraction === 4) return "Quarter"
		if (fraction === 8) return "8th"
		if (fraction === 16) return "16th"
		return "Whole"
	}
	private static calcNoteStem = (pitch: number) => pitch >= 11 ? "Down" : "Up"
}

export default SVGNote