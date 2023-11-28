import Ranges from "../../consts/metadata/ranges.json";
import * as  SMUFL from "./";

export class Barline {
	glyph: SMUFL.Glyph<Ranges["barlines"]["glyphs"][number]> 
	constructor(glyphName: Ranges["barlines"]["glyphs"][number]){
		this.glyph = new SMUFL.Glyph(glyphName)
	}
}