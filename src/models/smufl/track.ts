import * as Core from "../core";
import * as SMUFL from "./";

export class Track implements SMUFL.IPosition {
	bars: SMUFL.Bar[] | [SMUFL.Bar];
	metadata;
	staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
	x = 0;
	y;
	core;
	constructor(track: Core.Track) {
		this.core = track;
		this.bars = track.bars.length
			? track.bars.map((bar) => new SMUFL.Bar(bar, this))
			: [new SMUFL.Bar(new Core.Bar({ track, id: 1, notes: [] }), this)];
		this.y = 4 * track.id;
		if (track.metadata) this.metadata = new SMUFL.Metadata(track.metadata);
		if (track.id > 0) this.y += 8;
	}
}
