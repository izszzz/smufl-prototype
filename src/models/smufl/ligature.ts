import * as R from 'remeda';
import { SMUFLGlyph } from './glyph';

export class SMUFLLigature{
	glyphs: SMUFLGlyph[]
	get width(): number {
		const maxWidth = R.pipe(
			this.glyphs,
			R.maxBy(g=> g.width)
		)
		if(R.isNil(maxWidth)) throw new Error()
		return maxWidth.width
	}
	constructor(glyphs: SMUFLGlyph[]){
		this.glyphs = glyphs
	}
}