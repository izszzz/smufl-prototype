import Ranges from '../../consts/metadata/ranges.json';
import * as R from 'remeda';
import { SMUFLElement } from "./element";
import { SMUFLGlyph } from "./glyph";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';
import Metadata from '../../consts/metadata.json';

export class SMUFLStaff extends SMUFLElement{
	prev: SMUFLStaff | null;
	glyphs: SMUFLGlyph[]
	staffGlyph: SMUFLGlyph
	lineCount: Metadata["staffLines"][number];
	constructor(glyphs: SMUFLGlyph[], prev: SMUFLStaff | null, lineCount: Metadata["staffLines"][number]){
		super()
		this.glyphs = glyphs
		this.prev = prev
		this.lineCount = lineCount

		const maxWidthGlyph = this.#getMaxWidthGlyph(this.glyphs)
		if(!R.isDefined(maxWidthGlyph)) throw new Error("glyphs empty")

		const staffWidth = this.#calcStaffWidth(maxWidthGlyph)
		if(!R.isDefined(staffWidth)) throw new Error("staff not exist")

		this.staffGlyph = new SMUFLGlyph(staffWidth)
		this.width = this.staffGlyph.width
		if(prev) this.x += prev.x + (prev.staffGlyph?.width ?? 0)
	}

	#getMaxWidthGlyph=(glyphs:SMUFLGlyph[])=>
		R.pipe(
			glyphs,
			R.sortBy.strict((glyph) => glyph.width),
			R.last()
		)

	#calcStaffWidth = (glyph: SMUFLGlyph) =>
		R.pipe(
			Ranges.staves.glyphs,
			R.filter(staff => staff.includes(`staff${this.lineCount}Line`)),
			R.map.strict((key) => ({ key, width: BravuraMetadata.glyphAdvanceWidths[key] })),
			R.filter(({width})=>  glyph.width <= width ),
			R.sortBy.strict((x) => x.width),
			R.first()
		)?.key
}