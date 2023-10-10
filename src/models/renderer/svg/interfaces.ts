import Metadata from "../../../consts/metadata.json"
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import Glyphnames from "../../../consts/metadata/glyphnames.json"

export interface SMUFLElement {
	type?: Metadata["type"][number]
	element: keyof SVGElementTagNameMap
	y?: number
	x?: number
	width: number
	height?: number
	children?: SMUFLElement[]
}
export interface SMUFLGroup extends SMUFLElement{
	element: "g"
}
export interface SMUFLText extends SMUFLElement{
	element: "text"
	glyphName?: keyof Glyphnames;
	ligatureName?: keyof BravuraMetadata["ligatures"]
}