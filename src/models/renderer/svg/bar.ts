import * as R from 'remeda';
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGNote from "./note";
import Metadata from "../../../consts/metadata.json";
import Ranges from "../../../consts/metadata/ranges.json";
import { SMUFL, SMUFLElement, SMUFLGroup } from "./smufl";
import { SMUFLBar } from '../../smufl/bar';
import { SMUFLGlyph } from '../../smufl/glyph';

export default function SVGBar(bar: SMUFLBar): SMUFLGroup{
	const staffLineCount: Metadata["staffLines"][number] = 5;
	const children: SMUFLElement[] = []
	if(bar.clef) 
		children.push(SMUFL.createText({ type: "clef" , ...bar.clef, y: -1, }))
	if(bar.timeSig)
		children.push(
			{ 
				type: "timeSig",
				element: "g",
				children:[
					SMUFL.createText({ ...bar.timeSig.numerator, y: -2, }),
					SMUFL.createText({ ...bar.timeSig.denominator })
				],
				...bar.timeSig.numerator,
				y: -1,
			} as SMUFLGroup)
	children.push(
		...bar.notes.map(note => SVGNote(note)),
	)
	const appended = appendStaff(appendBarLine(bar, children), staffLineCount)
	return ({
		type: "bar",
		element: "g",
		width: appended.reduce((acc, item) => acc + item.width, 0),
		children: appended
	})
}
const appendBarLine = (bar: SMUFLBar,elements: SMUFLElement[]) =>{
	elements.unshift(SMUFL.createText({ type: "barline", ...bar.barline.start }))
	if(bar.barline.end) elements.push(SMUFL.createText({ type: "barline", ...bar.barline.end }))
	return elements
}
const appendStaff = (elements: SMUFLElement[], staffLineCount: number): SMUFLGroup[] =>{
	const staffLines = R.pipe(
		Ranges.staves.glyphs,
		R.filter(staff => staff.includes( `staff${staffLineCount}Lines`)),
		R.map((key) => ({
			key, 
			width: bravuraMetadata.glyphAdvanceWidths[key]
		}))
	) 
	const staffs: SMUFLGroup[] = []
	for(let i = 0; i < elements.length; i++){
			const element = elements[i]
			const staff = R.pipe(
				staffLines,
				R.filter(({width})=>  element.width <= width ),
				R.minBy((x) => x.width)
			)
			staffs.push(({
				type: "staff",
				element: "g",
				width: staff?.width ?? 3,
				x: staffs.reduce((acc, value)=> acc + value.width, 0),
				children: [
					element,
					SMUFL.createText({ glyphName: staff?.key ?? "staff5LinesWide", ...SMUFLGlyph.getBBoxByGlyphName(staff?.key ?? "staff5LinesWide") })
				]
			}))
	}
	return staffs
}