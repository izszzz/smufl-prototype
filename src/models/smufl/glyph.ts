import Glyphnames from "../../consts/metadata/glyphnames.json";
import BravuraMetadata from '../../consts/metadata/bravura_metadata.json';
import { SMUFLElement } from './element';
interface SMUFLGlyphOptions{
	x?: number
	y?: number
	overlap?: boolean
}
export class SMUFLGlyph<T extends keyof Glyphnames = keyof Glyphnames> extends SMUFLElement{
	parent: SMUFLElement;
	glyphName: T;
	options?: SMUFLGlyphOptions
	constructor(parent: SMUFLElement, glyphName: T, options?: SMUFLGlyphOptions) {
		super()
		const {width, height} = SMUFLGlyph.getBBoxByGlyphName(glyphName)
		this.glyphName = glyphName
		this.parent = parent
		this.width = width
		this.height = height
		this.options = options
		if(options){
			if(options.x) this.x = options.x
			if(options.y) this.y = options.y
		}
	}
	static getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const {bBoxNE, bBoxSW}= BravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
		const width = bBoxNE[0] - bBoxSW[0] 
		const height = bBoxNE[1] - bBoxSW[1]
		return {/*x: bBoxNE[0], y: bBoxSW[1], */ width, height};
	}
}