import Ranges from "../../consts/metadata/ranges.json";
import { Bar } from "../core/bar";
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import { SMUFLNote } from "./note";

export class SMUFLBar extends SMUFLElement {
	glyphs: (SMUFLGlyph | SMUFLGlyph[])[] = [];
	notes: SMUFLNote[];
	barline: {
		start: SMUFLGlyph<Ranges["barlines"]["glyphs"][number]>
		end?: SMUFLGlyph<Ranges["barlines"]["glyphs"][number]>
	} = {
		start: new SMUFLGlyph("barlineSingle"),
	}
	constructor(bar: Bar){
		super()
		this.notes = bar.notes.map(note => new SMUFLNote(note))
		if(!bar.prevBar) {
			this.glyphs.push(new SMUFLGlyph("gClef", {y: -1}))
			this.glyphs.push([new SMUFLGlyph("timeSig4", {y: -1}), new SMUFLGlyph("timeSig4", {y: -3})])
		}
		if(!bar.nextBar) this.barline.end = new SMUFLGlyph("barlineFinal")
	}

}