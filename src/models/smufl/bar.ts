import Ranges from "../../consts/metadata/ranges.json";
import * as Core from "../core";
import * as SMUFL from './';

export class Bar {
	glyphs: (SMUFL.Glyph | SMUFL.Ligature)[] = [];
	track: SMUFL.Track
	notes: SMUFL.Note[];
	barline: {
		start: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]> 
		end?: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]>
	} = {
		start: new SMUFL.Glyph("barlineSingle")
	} 
	metadata = {
		clef: new SMUFL.Glyph("gClef", { coord: {y: -1}}),
		timeSig: new SMUFL.Ligature([new SMUFL.Glyph("timeSig4", { coord: {y: -1}}), new SMUFL.Glyph("timeSig4", { coord: {y: -3}})])
	}
	get width(){
		return this.glyphs.reduce((acc, cur)=>acc + cur.staffWidth, 0) + this.notes.reduce((acc, cur)=> acc + cur.width, 0)
	}
	constructor(bar: Core.Bar, track: SMUFL.Track){
		this.track = track
		this.notes = bar.notes.map(note => new SMUFL.Note(note, this))
		if(!bar.next) this.barline.end = new SMUFL.Glyph("barlineFinal")
	}
}