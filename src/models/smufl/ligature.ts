import * as R from 'remeda';
import { SMUFLGlyph } from './glyph';
import { SMUFLStaff } from './staff';

export class SMUFLLigature {
	glyphs: SMUFLGlyph[]
	get width(): number {
		const maxWidth = R.pipe(
			this.glyphs,
			R.maxBy(g=> g.width)
		)
		if(R.isNil(maxWidth)) throw new Error()
		return maxWidth.width
	}
	get staffWidth():number{
		return SMUFLStaff.getStaffGlyph(this.width, 5).width // TODO: 定数
	}
	constructor(glyphs: SMUFLGlyph[]){
		this.glyphs = glyphs
	}
}