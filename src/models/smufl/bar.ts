import Metadata from "../../consts/metadata.json";
import Classes from "../../consts/metadata/classes.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Bar } from "../core/bar";
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import { SMUFLNote } from "./note";

export class SMUFLBar extends SMUFLElement {
	glyphs: SMUFLGlyph[] = [];
	notes: SMUFLNote[];
	staffLineCount: Metadata["staffLines"][number] = 5;
	clef?: SMUFLGlyph<Classes["clefs"][number]>;
	timeSig?: {
		denominator: SMUFLGlyph<Ranges["timeSignatures"]["glyphs"][number]>
		numerator: SMUFLGlyph<Ranges["timeSignatures"]["glyphs"][number]>
	}
	barline: {
		start: SMUFLGlyph<Ranges["barlines"]["glyphs"][number]>
		end?: SMUFLGlyph<Ranges["barlines"]["glyphs"][number]>
	} = {
		start: new SMUFLGlyph(this, "barlineSingle"),
	}
	constructor(bar: Bar){
		super()
		this.notes = bar.notes.map(note => new SMUFLNote(note))
		if(!bar.prevBar) {
			this.clef = new SMUFLGlyph(this, "gClef")
			this.timeSig = {
				denominator: new SMUFLGlyph(this,"timeSig4"),
				numerator: new SMUFLGlyph(this, "timeSig4")
			}
		}
		if(!bar.nextBar) this.barline.end = new SMUFLGlyph(this, "barlineFinal")
	}

}