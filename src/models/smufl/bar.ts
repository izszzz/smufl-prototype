import Metadata from "../../consts/metadata.json";
import Classes from "../../consts/metadata/classes.json";
import Ranges from "../../consts/metadata/ranges.json";
import { Bar } from "../core/bar";
import { SMUFLNote } from "./note";

export class SMUFLBar {
	private bar: Bar;
	smuflNotes: SMUFLNote[];
	staffLineCount: Metadata["staffLines"][number] = 5;
	clef?: Classes["clefs"][number];
	timeSig?: {
		denominator: Ranges["timeSignatures"]["glyphs"][number]
		numerator: Ranges["timeSignatures"]["glyphs"][number]
	}
	barline: {
		start: Ranges["barlines"]["glyphs"][number]
		end?: Ranges["barlines"]["glyphs"][number]
	} = {
		start: "barlineSingle",
	}
	constructor(bar: Bar){
		this.bar = bar
		this.smuflNotes = bar.notes.map(note=> new SMUFLNote(note))
		if(!bar.prevBar) {
			this.clef = "gClef"
			this.timeSig = {
				denominator: "timeSig4",
				numerator: "timeSig4"
			}
		}
		if(!bar.nextBar)
			this.barline.end = "barlineFinal"
	}
}