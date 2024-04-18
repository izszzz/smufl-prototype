import * as R from "remeda";
import * as SMUFL from "./";

interface ConstructorOptions {
	glyphAlign?: "end" | "start";
}

export class Staff {
	glyph?: SMUFL.Glyph | SMUFL.Ligature;
	staffGlyph: SMUFL.Glyph;
	glyphAlign: "end" | "start" = "start";
	width: number;
	track: SMUFL.Track;
	constructor(width: number, track: SMUFL.Track, options?: ConstructorOptions);
	constructor(
		glyph: SMUFL.Glyph | SMUFL.Ligature,
		track: SMUFL.Track,
		options?: ConstructorOptions,
	);
	constructor(
		firstArg: (SMUFL.Glyph | SMUFL.Ligature) | number,
		track: SMUFL.Track,
		options?: ConstructorOptions,
	) {
		this.track = track;
		const width = R.isNumber(firstArg) ? firstArg : firstArg.width;
		if (!R.isNumber(firstArg)) this.glyph = firstArg;
		this.staffGlyph = new SMUFL.Glyph({
			glyphName: SMUFL.Staff.getStaffGlyph(width, track.staffLineCount)
				.glyphName,
		});
		this.width = this.staffGlyph.width;
		this.glyphAlign = options?.glyphAlign ?? "start";
		if (this.glyph) this.#alignGlyph(this.glyph);
	}
	#alignGlyph = (glyph: NonNullable<SMUFL.Staff["glyph"]>) => {
		if (this.glyphAlign === "start") return;
		if (this.glyphAlign === "end") return;
		// glyph.x = this.staffGlyph.width - glyph.width;
	};
	static getStaffGlyph = (
		width: number,
		lineCount: SMUFL.Metadatas["staffLines"][number] = 5,
	): SMUFL.Glyph => {
		const glyph = R.pipe(
			SMUFL.Ranges.staves.glyphs,
			R.filter((staff) => staff.includes(`staff${lineCount}Line`)),
			R.map.strict((key) => ({
				key,
				width: SMUFL.BravuraMetadata.glyphAdvanceWidths[key],
			})),
			R.filter(({ width: staveWidth }) => width <= staveWidth),
			R.unique(),
			R.firstBy([(x) => x.width, "asc"]),
		);
		if (!glyph) throw new Error();
		return new SMUFL.Glyph({ glyphName: glyph.key });
	};
}
