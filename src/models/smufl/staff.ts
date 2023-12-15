import * as R from "remeda";
import Metadata from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Ranges from "../../consts/metadata/ranges.json";
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
		this.staffGlyph = new SMUFL.Glyph(
			SMUFL.Staff.getStaffGlyph(width, track.staffLineCount)?.key,
		);
		this.width = this.staffGlyph.width;
		this.glyphAlign = options?.glyphAlign ?? "start";
		if (R.isDefined(this.glyph)) this.#alignGlyph(this.glyph);
	}
	#alignGlyph = (glyph: NonNullable<SMUFL.Staff["glyph"]>) => {
		if (this.glyphAlign === "start") return;
		if (this.glyphAlign === "end")
			glyph.x = this.staffGlyph.width - glyph.width;
	};
	static getStaffGlyph = (
		width: number,
		lineCount: Metadata["staffLines"][number] = 5,
	) => {
		const glyph = R.pipe(
			Ranges.staves.glyphs,
			R.filter((staff) => staff.includes(`staff${lineCount}Line`)),
			R.map.strict((key) => ({
				key,
				width: BravuraMetadata.glyphAdvanceWidths[key],
			})),
			R.filter(({ width: staveWidth }) => width <= staveWidth),
			R.uniq(),
			R.minBy((x) => x.width),
		);
		if (R.isNil(glyph)) throw new Error();
		return glyph;
	};
}
