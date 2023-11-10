import Ranges from '../../consts/metadata/ranges.json';
import * as R from 'remeda';
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';
import Metadata from '../../consts/metadata.json';
import { SMUFLLigature } from './ligature';

export class SMUFLStaff extends SMUFLElement{
	glyph?: SMUFLGlyph | SMUFLLigature
	staffGlyph: SMUFLGlyph
	constructor(width: number, lineCount:Metadata["staffLines"][number] , glyph?: SMUFLGlyph | SMUFLLigature){
		super()
		const glyphName = SMUFLStaff.getStaffGlyph(width, lineCount)?.key
		this.staffGlyph = new SMUFLGlyph(glyphName)
		this.width = this.staffGlyph.width
		this.glyph = glyph
	}
	static getStaffGlyph = (width: number, lineCount: Metadata["staffLines"][number]) => {
		const glyph = R.pipe(
			Ranges.staves.glyphs,
			R.filter(staff => staff.includes(`staff${lineCount}Line`)),
			R.map.strict((key) => ({ key, width: BravuraMetadata.glyphAdvanceWidths[key] })),
			R.filter(({width: staveWidth})=>  width <= staveWidth),
			R.minBy((x) => x.width),
		)
		if(R.isNil(glyph)) throw new Error()
		return glyph
	}
}