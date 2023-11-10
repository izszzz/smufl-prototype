import * as R from 'remeda';
import { SMUFLGlyph } from './glyph';
import { SMUFLElement } from './element';

export class SMUFLLigature extends SMUFLElement {
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
		super()
		this.glyphs = glyphs
	}
}