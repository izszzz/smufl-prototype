import * as Core from "../core";
import * as SMUFL from "./";

interface IRow extends Partial<Core.ILink<Row>> {
	tracks: SMUFL.Track[];
	masterBars: SMUFL.MasterBar[];
}
export class Row implements IRow, SMUFL.IPosition {
	x = 0;
	y = 0;
	prev;
	next;
	tracks;
	masterBars;
	constructor({ masterBars, tracks, next, prev }: IRow) {
		this.prev = prev;
		this.next = next;
		this.masterBars = masterBars;
		this.tracks = tracks.map((track) => {
			const firstBar = track.bars[0];
			firstBar.metadata = new SMUFL.Metadata(firstBar.core.getMetadata());
			return track;
		});
	}
}
