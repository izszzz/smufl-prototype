import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

interface IRow extends Partial<Core.ILink<Row>> {
	tracks: SMUFL.Track[];
	masterBars: SMUFL.MasterBar[];
}
export class Row implements IRow, SMUFL.IPosition, SMUFL.IBox {
	x = 0;
	y = 0;
	height = 0;
	get width() {
		return R.pipe(
			this.masterBars,
			R.map((masterBar) => masterBar.width),
			R.reduce(R.add, 0),
		);
	}
	prev;
	next;
	tracks;
	masterBars;
	constructor({ masterBars, tracks, next, prev }: IRow) {
		this.prev = prev;
		this.next = next;
		this.masterBars = masterBars;
		this.tracks = tracks;
		for (const bar of R.first(this.masterBars)?.bars ?? [])
			bar.metadata = new SMUFL.Metadata(bar.core.getMetadata());
		for (const bar of R.last(this.masterBars)?.bars ?? [])
			bar.barline.end = new SMUFL.Glyph({
				glyphName: bar.core.next ? "barlineSingle" : "barlineFinal",
			});
	}
}
