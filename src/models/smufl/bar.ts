import Ranges from "../../consts/metadata/ranges.json";
import * as Core from "../core";
import * as SMUFL from './';

export class Bar{
	glyphs: (SMUFL.Glyph | SMUFL.Ligature)[] = [];
	notes: SMUFL.Note[];
	barline: {
		start: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]> 
		end?: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]>
	} = {
		start: new SMUFL.Glyph("barlineSingle")
	} 
	// TODO: barがtrackrow先頭の場合表示するようにする
	metadata = {
		clef: new SMUFL.Glyph("gClef", {y: -1}),
		timeSig: new SMUFL.Ligature([new SMUFL.Glyph("timeSig4", {y: -1}), new SMUFL.Glyph("timeSig4", {y: -3})])
	}
	get width(){
		return [...this.glyphs, ...this.notes].reduce((acc, cur)=>acc+ cur.width, 0)
	}
	constructor(bar: Core.Bar){
		this.notes = bar.notes.map(note => new SMUFL.Note(note))
		if(!bar.next) this.barline.end = new SMUFL.Glyph("barlineFinal")
	}
}