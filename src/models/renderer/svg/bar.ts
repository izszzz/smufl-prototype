import Bar from "../../bar";
import { SMUFLElement, SMUFLGroup, SMUFLText } from "./interfaces";
import * as R from 'remeda';
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGNote from "./note";
import Classes from "../../../consts/metadata/classes.json";
import Metadata from "../../../consts/metadata.json";
import Ranges from "../../../consts/metadata/ranges.json";
import SVGRenderer from "./renderer";

export default function SVGBar(bar: Bar): SMUFLGroup{
	const staffLineCount: Metadata["staffLines"][number] = 5;
	const clef: Classes["clefs"][number] = "gClef";
	const children: SMUFLElement[] = []
	const timeSigDenominator: Ranges["timeSignatures"]["glyphs"][number] = "timeSig4"
	const timeSigNumerator: Ranges["timeSignatures"]["glyphs"][number] = "timeSig4"
	if(!bar.prevBar) {
		children.push(
			{ 
				type: "clef" ,
				element: "text",
				glyphName: clef,
				y: -1,
				...SVGRenderer.getBBoxByGlyphName(clef)
			} as SMUFLText,
			{ 
				type: "timeSig",
				element: "g",
				y: -1,
				children:[
					{
						element: "text",
						glyphName: timeSigNumerator,
						y: -2,
						...SVGRenderer.getBBoxByGlyphName(timeSigNumerator)
					}	as SMUFLText,
					{
						element: "text",
						glyphName: timeSigDenominator,
						...SVGRenderer.getBBoxByGlyphName(timeSigDenominator)
					}	as SMUFLText
				],
				...SVGRenderer.getBBoxByGlyphName(timeSigNumerator),
			} as SMUFLGroup,

		)
		
	}
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
const appendBarLine = (bar: Bar,elements: SMUFLElement[]) =>{
	elements.unshift({ 
			type: "barline",
			element: "text",
			glyphName: "barlineSingle",
			...SVGRenderer.getBBoxByGlyphName("barlineSingle")
		} as SMUFLText
	)
	if(!bar.nextBar)
		elements.push(
			{
				type: "barline",
				element: "text",
				glyphName: "barlineFinal",
				...SVGRenderer.getBBoxByGlyphName("barlineFinal")
			} as SMUFLText
		)
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
					{
						element: "text",
						glyphName: staff?.key ?? "staff5LinesWide",
						...SVGRenderer.getBBoxByGlyphName(staff?.key ?? "staff5LinesWide")
					} as SMUFLText
				]
			}))

	}
	return staffs
}