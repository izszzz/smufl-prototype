import * as Core from "../core";
import * as SMUFL from "./";

export class Metadata implements SMUFL.IBox {
	height = 0;
	glyphs;
	get width() {
		return this.glyphs.width;
	}
	constructor({ timeSignature }: Core.Metadata) {
		this.glyphs = new SMUFL.Glyphs({
			glyphs: [
				[
					new SMUFL.Glyph({
						glyphName: "gClef",
					}),
				],
				[
					new SMUFL.Glyph({
						glyphName: `timeSig${timeSignature.numerator}`,
					}),
					new SMUFL.Glyph({
						glyphName: `timeSig${timeSignature.denominator}`,
						y: -2,
					}),
				],
			],
		});
	}
}
