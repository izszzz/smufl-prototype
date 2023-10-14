import Metadata from "../../../consts/metadata.json"
import Glyphnames from "../../../consts/metadata/glyphnames.json"

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
}