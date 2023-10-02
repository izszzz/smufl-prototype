import SVGRenderer from "./renderer";
import smufl from "../../../consts/smufl.json"
import SVGNote from "./note";
import Track from "../../track";

class SVGTrack {
	rootElement = SVGTrack.setRootElement();
	svgRenderer: SVGRenderer;
	track: Track;
	notes: SVGNote[] =[];
	constructor(svgRenderer: SVGRenderer, track: Track){
		this.svgRenderer = svgRenderer;
		this.track = track

		const elements:SVGGElement[] = []
		this.notes = track.notes.map(note =>new SVGNote(svgRenderer, note))

		elements.push(
			SVGRenderer.createUnicodeText(smufl.barLines.single),
			// SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			SVGRenderer.createUnicodeText(smufl.clefs.gClef),
			// SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			SVGRenderer.createUnicodeText(smufl.timeSignatures.fourOverFour),
			// SVGRenderer.createUnicodeText(smufl.staves.staff.fiveLines.narrow),
			...this.notes.map(note=> note.rootElement),
			SVGRenderer.createUnicodeText(smufl.barLines.final)
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
		elements.forEach(el=>this.rootElement.appendChild(el));
	}
	static setRootElement(){
		const group= SVGRenderer.createSVGElement("g")
		group.setAttribute("type", "track");
		return group;
	}
}

export default SVGTrack