import Ranges from "../../consts/metadata/ranges.json";
import { Bar as CoreBar } from "../core/bar";
import * as SMUFL from './';

export class Bar {
	glyphs: (SMUFL.Glyph | SMUFL.Ligature)[] = [];
	notes: SMUFL.Note[];
	barline: {
		end?: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]>
	} = {} 
	// TODO: barがtrackrow先頭の場合表示するようにする
	metadata = {
		clef: this.glyphs.push(new SMUFL.Glyph("gClef", {y: -1})),
		timeSig: this.glyphs.push(new SMUFL.Ligature([new SMUFL.Glyph("timeSig4", {y: -1}), new SMUFL.Glyph("timeSig4", {y: -3})]))
	}
	constructor(bar: CoreBar){
		this.notes = bar.notes.map(note => new SMUFL.Note(note))
		if(!bar.nextBar) this.barline.end = new SMUFL.Glyph("barlineFinal")
	}
}