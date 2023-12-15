import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Glyphnames from "../../consts/metadata/glyphnames.json";
import * as SMUFL from "./";

interface ConstructorOptions {
	coord: ConstructorParameters<typeof SMUFL.Coord>[number];
}
export class Glyph<
	T extends keyof Glyphnames = keyof Glyphnames,
> extends SMUFL.Coord {
	glyphName: T;
	width = 0;
	height = 0;
	get staffWidth(): number {
		return SMUFL.Staff.getStaffGlyph(this.width).width;
	}
	constructor(glyphName: T, options?: Partial<ConstructorOptions>) {
		super(options?.coord);
		const { width, height } = this.#getBBoxByGlyphName(glyphName);
		this.glyphName = glyphName;
		this.width = width;
		this.height = height;
	}
	#getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const { bBoxNE, bBoxSW } =
			BravuraMetadata.glyphBBoxes[
				glyphName as keyof BravuraMetadata["glyphBBoxes"]
			];
		const width = bBoxNE[0] - bBoxSW[0];
		const height = bBoxNE[1] - bBoxSW[1];
		return { /*x: bBoxNE[0], y: bBoxSW[1], */ width, height };
	};
}
