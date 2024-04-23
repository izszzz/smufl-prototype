import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

interface IScore {
	type: "Pagination" | "VerticalScroll" | "HorizontalScroll";
	clientWidth: number;
	tracks: SMUFL.Track[];
	masterBars: SMUFL.MasterBar[];
	rows: SMUFL.Row[];
}
export class Score implements IScore {
	type;
	clientWidth;
	tracks;
	masterBars;
	rows: SMUFL.Row[] = [];
	constructor(
		{ tracks }: Core.Score,
		clientWidth: number,
		type: IScore["type"],
	) {
		this.type = type;
		this.clientWidth = clientWidth;
		this.tracks = tracks.map((track) => new SMUFL.Track(track));
		this.masterBars = R.pipe(
			this.tracks,
			R.flatMap((track) => track.bars),
			R.groupBy((bar) => bar.core.id),
			R.entries,
			R.map(
				([id, bars]) =>
					new SMUFL.MasterBar({
						id: Number(id),
						bars,
					}),
			),
		);
	}
}
