import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Metadata from "../../../consts/metadata.json"
import Glyphnames from "../../../consts/metadata/glyphnames.json"
import { Note } from "../../core/note"

export class SMUFL {
	static createSMUFLNote = (note: Note) => {
	}
	static createBar = () => {}
	static createTrack = () => {}
	static createScore = () => {}
	static createText = ({glyphName, ...props}: Omit<SMUFLText, "element" | "height" | "width">): SMUFLText => {
		return { 
			glyphName, 
			element: "text", 
			...props,
			...SMUFL.getBBoxByGlyphName(glyphName)
		}
	}
	static getBBoxByGlyphName = (glyphName: keyof Glyphnames) => {
		const {bBoxNE, bBoxSW}= BravuraMetadata.glyphBBoxes[glyphName as keyof BravuraMetadata["glyphBBoxes"]]
		const width = bBoxNE[0] - bBoxSW[0] 
		const height = bBoxNE[1] - bBoxSW[1]
		return {/*x: bBoxNE[0], y: bBoxSW[1], */ width, height};
	}
}

export interface SMUFLElement {
	type?: Metadata["type"][number]
	element: keyof SVGElementTagNameMap
	y?: number
	x?: number
	width: number
}
export interface SMUFLGroup extends SMUFLElement{
	element: "g"
	children?: SMUFLElement[]
}
export interface SMUFLText extends SMUFLElement{
	element: "text"
	glyphName: keyof Glyphnames;
	height: number
}