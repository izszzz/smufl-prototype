import * as R from 'remeda';
import * as  SMUFL from './';

export class Ligature extends SMUFL.Element {
	glyphs: SMUFL.Glyph[]
	get width(): number {
		const maxWidth = R.pipe(
			this.glyphs,
			R.maxBy(g=> g.width)
		)
		if(R.isNil(maxWidth)) throw new Error()
		return maxWidth.width
	}
	constructor(glyphs: SMUFL.Glyph[]){
		super()
		this.glyphs = glyphs
	}
}