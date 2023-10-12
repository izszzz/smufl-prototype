import Bar from "../../bar";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";
import { SMUFLElement, SMUFLGroup, SMUFLText } from "./interfaces";
import * as R from 'remeda';
import classes from "../../../consts/metadata/classes.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import SVGNote, { getBBoxByGlyphName, getBBoxByLiguature } from "./note";
import Classes from "../../../consts/metadata/classes.json";
import Metadata from "../../../consts/metadata.json";

export default function SVGBar(bar: Bar): SMUFLGroup{
	const staffLineCount: Metadata["staffLines"][number] = 5;
	const clef: Classes["clefs"][number] = "gClef";
	const children: SMUFLElement[] = []
	if(!bar.prevBar) {
		children.push({ 
				type: "clef" ,
				element: "text",
				glyphName: clef,
				y: -1,
				...getBBoxByGlyphName(clef)
			} as SMUFLText
		)
		children.push({
				type: "timeSig",
				element: "text",
				ligatureName: "timeSig4over4",
				...getBBoxByLiguature("timeSig4over4")
			} as SMUFLText,
		)
	}
	children.push(
		...bar.notes.map(note => SVGNote(note)),
	)
	const appended = appendStaff(appendBarLine(bar, children), staffLineCount)
	console.log(appended)
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
			...getBBoxByGlyphName("barlineSingle")
		} as SMUFLText
	)
	if(!bar.nextBar)
		elements.push(
			{
				type: "barline",
				element: "text",
				glyphName: "barlineFinal",
				...getBBoxByGlyphName("barlineFinal")
			} as SMUFLText
		)
	return elements
}
const appendStaff = (elements: SMUFLElement[], staffLineCount: number): SMUFLGroup[] =>{
	const staffLines = R.pipe(
		classes.forTextBasedApplications,	
		R.filter(staff => staff.includes( `staff${staffLineCount}Lines`)),
		R.map((key) => ({
			key, width: bravuraMetadata.glyphAdvanceWidths[key as keyof BravuraMetadata["glyphAdvanceWidths"]]
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
						...getBBoxByGlyphName(staff?.key ?? "staff5LinesWide")
					} as SMUFLText
				]
			}))

	}
	return staffs
}