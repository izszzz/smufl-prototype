import * as R from "remeda";
import * as SMUFL from "./";

export class Ligature implements SMUFL.IBox {
	glyphs: SMUFL.Glyph[];
	height = 0;
	get width(): number {
		const maxWidth = R.pipe(this.glyphs, R.firstBy([(g) => g.width, "desc"]));
		if (R.isNullish(maxWidth)) throw new Error();
		return maxWidth.width;
	}
	get staffWidth(): number {
		return SMUFL.Staff.getStaffGlyph(this.width).width;
	}
	constructor(glyphs: SMUFL.Glyph[]) {
		this.glyphs = glyphs;
	}
}
