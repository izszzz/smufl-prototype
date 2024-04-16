import * as SMUFL from "./";

export class Barline implements SMUFL.IPosition {
	x = 0;
	y = 0;
	glyph: SMUFL.Glyph<SMUFL.Ranges["barlines"]["glyphs"][number]>;
	constructor(glyphName: SMUFL.Ranges["barlines"]["glyphs"][number]) {
		this.glyph = new SMUFL.Glyph({ glyphName });
	}
}
