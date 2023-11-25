import * as R from "remeda"
import glyphNames from "../../consts/metadata/glyphnames.json"
import Glyphnames from "../../consts/metadata/glyphnames.json";
import Metadata from "../../consts/metadata.json";
import * as SMUFL from "../smufl";
import * as Core from "../core";
interface SVGRendererOptions{
	layoutType: SMUFL.Score["type"]
	fontSize: number
}

class SVGRenderer {
	element: HTMLElement;
	score: Core.Score
	svg: SVGSVGElement;
	fontSize: SVGRendererOptions["fontSize"];
	fontSizeRatio: number;
	layoutType: SMUFL.Score["type"] = "HorizontalScroll"
	constructor(element: HTMLElement, score: Core.Score, options?: SVGRendererOptions){
		this.element = element;
		this.score = score;
		this.fontSize = 30
		if(options){
			if(options.fontSize) this.fontSize = options.fontSize
			if(options.layoutType) this.layoutType = options.layoutType
		}
		this.fontSizeRatio = this.fontSize / Metadata.defaultFontSize
		this.svg = this.createSVGElement(
			"svg", 
			{ 
				width: "100%", 
				height: "100%",
				"font-size": this.fontSize
			}
		);
		this.upsertSVGElement();
	}
	createTransform(x: number, y:number){
		const transform = this.svg.createSVGTransform()
		transform.setTranslate(x, y)
		return transform;
	}
	createSMULFSVGElement = (glyphName: keyof Glyphnames, attributes?: Parameters<typeof this.createSVGElement>[1]) =>
		this.createUnicodeText(glyphNames[glyphName].codepoint, attributes)
	createSVGElement = <K extends keyof SVGElementTagNameMap>(qualifiedName: K, attributes: Record<string, unknown> = {}) => {
		const element = document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
		if(qualifiedName === "g")
			(element as SVGGElement).transform.baseVal.appendItem(this.createTransform((attributes.x as number ?? 0) * this.fontSizeRatio, (attributes.y as number ?? 0) * this.fontSizeRatio));
		R.pipe(
			attributes,
			R.mapValues((v, k)=> ["x", "y", "width", "height"].includes(k) && R.isNumber(v) ? v * this.fontSizeRatio : v),
			R.toPairs,
			R.forEach(([k, v])=> element.setAttribute(k, String(v)))
		)
		return element
	}
	private upsertSVGElement = () => {
		while (this.element.firstChild) this.element.firstChild.remove()
		this.element
			.appendChild(this.svg)
			.appendChild(this.createSVGScore(new SMUFL.Score(this.score, this.svg.clientWidth / this.fontSizeRatio, this.layoutType)));
	}
	private createUnicodeText = (code: string, attributes?: Parameters<typeof this.createSVGElement>[1] ) => 
		 this.createText(code.replace('U+', '&#x'), attributes)
	private createText (content: string, attributes?: Parameters<typeof this.createSVGElement>[1]) {
		const text = this.createSVGElement("text", attributes)
		text.innerHTML = content
		return text;
	};

	private createSVGScore=(score: SMUFL.Score)=>{
		console.log(score)

		const root = this.createSVGElement("g")
		score.staffs.forEach((trackRows, i)=>{
			const trackRowElement = this.createSVGElement("g", {type: "row", y: 20 * i + 10})
			root.appendChild(trackRowElement)
			trackRows.forEach((trackStaffs, i)=>{
				const trackElement = this.createSVGElement("g", {type: "track", y: 12 * i})
				trackRowElement.appendChild(trackElement)
				const staffs = trackStaffs.flat()
				staffs.forEach((staff, i)=>{
					const staffElement = this.createSVGElement("g", {type: "note", x: staffs.slice(0, i).reduce((acc, cur)=>acc+cur.width, 0)})
					trackElement.appendChild(staffElement)
					staffElement.appendChild(this.createSMULFSVGElement(staff.staffGlyph.glyphName, {...staff.staffGlyph}))
					if (staff.glyph instanceof SMUFL.Glyph) staffElement.appendChild(this.createSMULFSVGElement(staff.glyph.glyphName, {...staff.glyph}))
					if (staff.glyph instanceof SMUFL.Ligature) staff.glyph.glyphs.forEach(g => staffElement.appendChild(this.createSMULFSVGElement(g.glyphName, {...g})))
				})
			})

			// const firstTrackRows = R.first(trackRows)
			// if(R.isNil(firstTrackRows)) return
			// const lastBarStaff = R.last(firstTrackRows.barStaffs)
			// if(R.isNil(lastBarStaff)) return
			// firstTrackRows.barStaffs.map(({x}) => createBarline(trackRows.length, "barlineSingle", { x }).forEach((barline)=> trackRowElement.appendChild(barline)))
			// createBarline(trackRows.length, i === trackStaffRows.length-1	? "barlineFinal": "barlineSingle", { x: lastBarStaff.x + lastBarStaff.width }).forEach((barline)=> trackRowElement.appendChild(barline))
		})
		return root
	}
}
export default SVGRenderer;