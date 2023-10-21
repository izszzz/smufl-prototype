import Ranges from '../../consts/metadata/ranges.json';
import * as R from 'remeda';
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';

export class SMUFLStaff extends SMUFLElement{
	prev: SMUFLStaff | null;
	glyphs: SMUFLGlyph[]
	staffGlyph?: SMUFLGlyph
	constructor(glyphs: SMUFLGlyph[], prev: SMUFLStaff | null){
		super()
		this.glyphs = glyphs
		this.prev = prev
		const maxWidthGlyph = R.maxBy(glyphs, (glyph)=> glyph.width)
		if(maxWidthGlyph) this.staffGlyph = new SMUFLGlyph(this, this.calcStaffWidth(maxWidthGlyph) ?? "staff4Lines")
		if(prev) this.x += prev.x + (prev.staffGlyph?.width ?? 0)
	}

	private calcStaffWidth (glyph: SMUFLGlyph){
		return R.pipe(
			Ranges.staves.glyphs,
			R.filter(staff => staff.includes("staff5Line")), //TODO: fix line count to dynamic
			R.map((key) => ({
				key, 
				width: BravuraMetadata.glyphAdvanceWidths[key]
			})),
			R.filter(({width})=>  glyph.width <= width ),
			R.minBy((x) => x.width)
		)?.key
	}
}