import * as R from "remeda";
import * as SMUFL from "./";

interface IGlyphs {
	glyphs: SMUFL.Glyph[][];
}

export class Glyphs implements IGlyphs, SMUFL.IBox {
	height = 0;
	glyphs;
	get width() {
		return R.pipe(
			this.glyphs,
			R.map((g) => R.firstBy(g, [R.prop("width"), "desc"])?.width),
			R.filter(R.isTruthy),
			R.reduce(R.add, 0),
		);
	}
	constructor({ glyphs }: IGlyphs) {
		this.glyphs = glyphs;
	}
}
