import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"
import SVGNote from "./note";

class SVGTrack {
	rootElement = SVGRenderer.createSVGElement("g");
	svgRenderer: SVGRenderer;
	notes: SVGNote[] =[];
	constructor(svgRenderer: SVGRenderer){
		this.svgRenderer = svgRenderer;
		const elements:SVGGElement[] = []
		this.notes = [new SVGNote(svgRenderer), new SVGNote(svgRenderer), new SVGNote(svgRenderer),new SVGNote(svgRenderer)]

		elements.push(
			SVGRenderer.createUnicodeTextWithStave(smufl.barLines.single),
			SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			SVGRenderer.createUnicodeTextWithStave(smufl.clefs.gClef),
			SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			SVGRenderer.createUnicodeTextWithStave(smufl.timeSignatures.fourOverFour),
			SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			...this.notes.map(note=> note.rootElement),
			SVGRenderer.createUnicodeTextWithStave( smufl.barLines.final)
		);
		/* 
			text要素にgetcomputedtextlengthというメソッドがある。
			このメソッドは、レンダリングされたあとに実行しなければ常に0が返される。
			unicodeとstaveを同時にレンダリングするのではなく、
			1. unicodeを作成
			2. unicodeをレンダリング
			3. unicodeのtext要素のgetcomputedtextlengthを実行
			4. 3から取得できた文字の長さをもとに、適したstaveをレンダリングする
		 */
		elements.forEach((el)=>{
			el.transform.baseVal.appendItem(this.svgRenderer.createTransform(0, 0))

			this.rootElement.appendChild(el)

			const prevElement = el.previousSibling as SVGGElement | null
			if (!prevElement) return;
			const {e, f} = prevElement.transform.baseVal.getItem(0).matrix;
			el.transform.baseVal.clear();
			el.transform.baseVal.appendItem(this.svgRenderer.createTransform(e + Number(prevElement.getAttribute("width")), f))
		});
		this.notes.map(note => this.rootElement.appendChild(note.rootElement))
	}
}

export default SVGTrack