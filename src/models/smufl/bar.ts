import * as Core from "../core";
import * as SMUFL from "./";

export class Bar implements SMUFL.IBox {
	x = 0;
	y = 0;
	height = 0;
	get width() {
		return 0;
	}
	track;
	notes;
	core;
	barline: {
		start: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
		end?: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
	} = {
		start: new SMUFL.Glyph({ glyphName: "barlineSingle" }),
	};
	metadata;
	constructor(bar: Core.Bar, track: SMUFL.Track) {
		this.core = bar;
		this.track = track;
		this.notes = bar.notes.map((note) => new SMUFL.Note(note, this));
		if (bar.metadata) this.metadata = new SMUFL.Metadata(bar.metadata);
	}
}
