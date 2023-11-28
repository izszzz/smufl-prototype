import * as R from 'remeda';
import * as SMUFL from "./";
import Glyphnames from "../../consts/metadata/glyphnames.json";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';

export class Glyph<T extends keyof Glyphnames = keyof Glyphnames> extends SMUFL.Coord{
	glyphName: T;
	width: number = 0
	height: number =0 
	get staffWidth(): number {
		return SMUFL.Staff.getStaffGlyph(this.width).width
	}
	constructor(glyphName: T, coord?: {x?: number, y?: number}) {
		super()
		const {width, height} = this.#getBBoxByGlyphName(glyphName)
		this.glyphName = glyphName
		this.width = width
		this.height = height
		if(R.isDefined(coord)){
			if(coord.x) this.x = coord.x
			if(coord.y) this.y = coord.y
		}
	}
	#getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const {bBoxNE, bBoxSW}= BravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
		const width = bBoxNE[0] - bBoxSW[0] 
		const height = bBoxNE[1] - bBoxSW[1]
		return {/*x: bBoxNE[0], y: bBoxSW[1], */ width, height};
	}
}