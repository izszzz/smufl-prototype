import Ranges from "../../consts/metadata/ranges.json";
import { Bar } from "../core/bar";
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import { SMUFLLigature } from "./ligature";
import { SMUFLNote } from "./note"

export class SMUFLBar extends SMUFLElement {
	glyphs: (SMUFLGlyph | SMUFLLigature)[] = [];
	notes: SMUFLNote[];
	barline: {
		end?: SMUFLGlyph<Ranges["barlines"]["glyphs"][number]>
	} = {} 
	constructor(bar: Bar){
		super()
		this.notes = bar.notes.map(note => new SMUFLNote(note))
		if(!bar.prevBar) {
			// TODO: metadataに格納する。barが先頭の場合表示するようにする
			this.glyphs.push(new SMUFLGlyph("gClef", {y: -1}))
			this.glyphs.push(new SMUFLLigature([new SMUFLGlyph("timeSig4", {y: -1}), new SMUFLGlyph("timeSig4", {y: -3})]))
		}
		if(!bar.nextBar) this.barline.end = new SMUFLGlyph("barlineFinal")
	}
}