import * as R from 'remeda';
import * as  SMUFL from './';

export class Ligature extends SMUFL.Coord{
	glyphs: SMUFL.Glyph[]
	get width(): number {
		const maxWidth = R.pipe(
			this.glyphs,
			R.maxBy(g=> g.width)
		)
		if(R.isNil(maxWidth)) throw new Error()
		return maxWidth.width
	}
	get staffWidth(): number{
		return SMUFL.Staff.getStaffGlyph(this.width).width
	}
	constructor(glyphs: SMUFL.Glyph[]){
		super()
		this.glyphs = glyphs
	}
}