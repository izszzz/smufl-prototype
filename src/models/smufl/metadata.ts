import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

export class Metadata implements SMUFL.IBox {
	glyphs: (SMUFL.Glyph | SMUFL.Glyph[])[];
	clef = new SMUFL.Glyph({
		glyphName: "gClef",
	});
	timeSignature;
	height = 0;
	get width() {
		return this.glyphs.reduce(
			(prev, cur) =>
				((R.isArray(cur) ? R.firstBy(cur, [(g) => g.staffWidth, "desc"]) : cur)
					?.staffWidth ?? 0) + prev,
			0,
		);
	}
	constructor({ timeSignature }: Core.Metadata) {
		this.timeSignature = {
			numerator: new SMUFL.Glyph({
				glyphName: `timeSig${timeSignature.numerator}`,
			}),
			denominator: new SMUFL.Glyph({
				glyphName: `timeSig${timeSignature.denominator}`,
				y: -2,
			}),
		};
		this.glyphs = [
			this.clef,
			[this.timeSignature.numerator, this.timeSignature.denominator],
		];
	}
}
