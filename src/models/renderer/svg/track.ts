import * as R from 'remeda';
import classes from "../../../consts/metadata/classes.json"
import bravuraMetadata from "../../../consts/metadata/bravura_metadata.json"
import  SVGNote, { getBBoxByGlyphName, getBBoxByLiguature }  from "./note";
import Track from "../../track";
import BravuraMetadata from "../../../consts/metadata/bravura_metadata.json";
import Metadata from '../../../consts/metadata.json';
import { SMUFLElement, SMUFLGroup, SMUFLText } from './interfaces';
import Classes from '../../../consts/metadata/classes.json';

export default function SVGTrack(track: Track): SMUFLGroup {
	const staffLineCount: Metadata["staffLines"][number] = 5;
	const children: SMUFLElement[] = []
	const clef: Classes["clefs"][number] = "gClef";
	children.push({ 
			type: "barline",
			element: "text",
			glyphName: "barlineSingle",
			...getBBoxByGlyphName("barlineSingle")
		} as SMUFLText
	)
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
	children.push(
		...track.notes.map(note => SVGNote(note)),
	)
	children.push(
		{
			type: "barline",
			element: "text",
			glyphName: "barlineFinal",
			...getBBoxByGlyphName("barlineFinal")
		} as SMUFLText
	)

	return ({
		type: "track",
		element: "g",
		width: 0,
		children: appendStaff(children, staffLineCount)
	})
}
const appendStaff = (elements: SMUFLElement[], staffLineCount: number): SMUFLGroup[] =>{
	const staffLines = R.pipe(
		classes.forTextBasedApplications,	
		R.filter(staff => staff.includes( `staff${staffLineCount}Lines`)),
		R.map((key) => ({
			key, width: bravuraMetadata.glyphAdvanceWidths[key as keyof BravuraMetadata["glyphAdvanceWidths"]]
		}))
	) 
	return elements.map(element => {
			const staff = R.pipe(
				staffLines,
				R.filter(({width})=>  element.width <= width ),
				R.minBy((x) => x.width)
			)
			return ({
				type: "staff",
				element: "g",
				width: staff?.width ?? 3,
				children: [
					element,
					{
						element: "text",
						glyphName: staff?.key ?? "staff5LinesWide",
						...getBBoxByGlyphName(staff?.key ?? "staff5LinesWide")
					}
				]
			})
		})
}