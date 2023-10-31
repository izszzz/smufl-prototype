import * as R from "remeda"
import glyphNames from "../../consts/metadata/glyphnames.json"
import Glyphnames from "../../consts/metadata/glyphnames.json";
import Metadata from "../../consts/metadata.json";
import { Score } from "../core/score";
import { SMUFLScore } from "../smufl/score";
import { SMUFLGlyph } from "../smufl/glyph";
import { SMUFLLigature } from "../smufl/ligature";
interface SVGRendererOptions{
	layoutMode: "PAGE" | "VerticalScroll" | "HorizontalScroll"
	fontSize: number
}

class SVGRenderer {
	element: HTMLElement;
	score: Score
	svg: SVGSVGElement;
	layoutMode: SVGRendererOptions["layoutMode"] = "VerticalScroll"
	fontSize: SVGRendererOptions["fontSize"] = 30;
	fontSizeRatio = this.fontSize / Metadata.defaultFontSize
	constructor(element: HTMLElement, score: Score, options?: SVGRendererOptions){
		this.element = element;
		this.score = score;
		this.svg = this.createSVGElement(
			"svg", 
			{ 
				width: "100%", 
				height: "100%",
				"font-size": this.fontSize
			}
		);
		this.upsertSVGElement();
		if(options){
			if(options.fontSize) this.fontSize = options.fontSize
			if(options.layoutMode) this.layoutMode= options.layoutMode
		}
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
		const fontSizeRatio = this.fontSize / Metadata.defaultFontSize
		if(qualifiedName === "g")
			(element as SVGGElement).transform.baseVal.appendItem(this.createTransform((attributes.x as number ?? 0) * fontSizeRatio, (attributes.y as number ?? 0) * fontSizeRatio));
		R.pipe(
			attributes,
			R.mapValues((v, k)=> ["x", "y", "width", "height"].includes(k) && R.isNumber(v) ? v * fontSizeRatio : v),
			R.toPairs,
			R.forEach(([k, v])=> element.setAttribute(k, String(v)))
		)
		return element
	}
	private upsertSVGElement = () => {
		while (this.element.firstChild) this.element.firstChild.remove()
		this.element
			.appendChild(this.svg)
			.appendChild(this.createSVGScore(new SMUFLScore(this.score, this.svg.clientWidth)));
	}
	private createUnicodeText = (code: string, attributes?: Parameters<typeof this.createSVGElement>[1] ) => 
		 this.createText(code.replace('U+', '&#x'), attributes)
	private createText (content: string, attributes?: Parameters<typeof this.createSVGElement>[1]) {
		const text = this.createSVGElement("text", attributes)
		text.innerHTML = content
		return text;
	};
	private createSVGScore=(score: SMUFLScore)=>{
		console.log(score)
		const root = this.createSVGElement("g")
		score.stave.trackStaffs.forEach((trackStave, i)=>{
			const track = this.createSVGElement("g", {type: "track", y: 10 * (i + 1)})
			root.appendChild(track)
			trackStave.barStaffs.forEach((barStave)=>{
				const bar = this.createSVGElement("g", {type: "bar", x: barStave.x })
				track.appendChild(bar)
				barStave.staffs.forEach(({glyph, staffGlyph, ...props}) => {
					const staff = this.createSVGElement("g", {type: "note", ...props})
					bar.appendChild(staff)
					staff.appendChild(this.createSMULFSVGElement(staffGlyph.glyphName, {...staffGlyph}))
					if (glyph instanceof SMUFLGlyph) staff.appendChild(this.createSMULFSVGElement(glyph.glyphName, {...glyph}))
					if (glyph instanceof SMUFLLigature) glyph.glyphs.forEach(g => staff.appendChild(this.createSMULFSVGElement(g.glyphName, {...g})))
				})
			})
		})
		return root
	}
}
export default SVGRenderer;