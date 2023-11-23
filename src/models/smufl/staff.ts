import Ranges from '../../consts/metadata/ranges.json';
import * as R from 'remeda';
import * as SMUFL from "./";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';
import Metadata from '../../consts/metadata.json';

export class Staff extends SMUFL.Element{
	glyph?: SMUFL.Glyph | SMUFL.Ligature
	staffGlyph: SMUFL.Glyph
	glyphAlign: "end" | "start"
	constructor(width: number, lineCount:Metadata["staffLines"][number] , glyph?: SMUFL.Glyph | SMUFL.Ligature, glyphAlign: SMUFL.Staff["glyphAlign"] = "start"){
		super()
		this.staffGlyph = new SMUFL.Glyph(SMUFL.Staff.getStaffGlyph(width, lineCount)?.key)
		this.width = this.staffGlyph.width
		this.glyph = glyph
		this.glyphAlign = glyphAlign
		if(R.isDefined(this.glyph)) this.#alignGlyph(this.glyph)
	}
	#alignGlyph = (glyph: NonNullable<SMUFL.Staff["glyph"]>) =>{
		if(this.glyphAlign === "start") return
		if(this.glyphAlign === "end") glyph.x = this.staffGlyph.width - glyph.width
	}
	static getStaffGlyph = (width: number, lineCount?: Metadata["staffLines"][number]) => {
		const glyph = R.pipe(
			Ranges.staves.glyphs,
			R.filter(staff => staff.includes(`staff${lineCount ?? 5}Line`)),
			R.map.strict((key) => ({ key, width: BravuraMetadata.glyphAdvanceWidths[key] })),
			R.filter(({width: staveWidth})=>  width <= staveWidth),
			R.uniq(),
			R.minBy((x) => x.width),
		)
		if(R.isNil(glyph)) throw new Error()
		return glyph
	}
}