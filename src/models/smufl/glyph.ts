import * as R from 'remeda';
import Glyphnames from "../../consts/metadata/glyphnames.json";
import Ranges from '../../consts/metadata/ranges.json';
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';
import { SMUFLElement } from './element';
interface SMUFLGlyphOptions{
	overlap: boolean
}
export class SMUFLGlyph<T extends keyof Glyphnames = keyof Glyphnames> extends SMUFLElement{
	parent: SMUFLElement;
	glyphName: T;
	staffWidth: number;
	options?: SMUFLGlyphOptions
	constructor(parent: SMUFLElement, glyphName: T, options?: SMUFLGlyphOptions) {
		super()
		const {width, height} = SMUFLGlyph.getBBoxByGlyphName(glyphName)
		this.glyphName = glyphName
		this.parent = parent
		this.width = width
		this.height = height
		this.options = options
		this.staffWidth = this.calcStaffWidth(this)
		if(!options?.overlap) parent.width += this.width
	}
	static getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const {bBoxNE, bBoxSW}= BravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
		const width = bBoxNE[0] - bBoxSW[0] 
		const height = bBoxNE[1] - bBoxSW[1]
		return {/*x: bBoxNE[0], y: bBoxSW[1], */ width, height};
	}
	private calcStaffWidth (glyph: typeof this){
		return R.pipe(
			Ranges.staves.glyphs,
			R.filter(staff => staff.includes("staff4Line")), //TODO: fix line count to dynamic
			R.map((key) => ({
				key, 
				width: BravuraMetadata.glyphAdvanceWidths[key]
			})),
			R.filter(({width})=>  glyph.width <= width ),
			R.minBy((x) => x.width)
		)?.width ?? 0
	}
}