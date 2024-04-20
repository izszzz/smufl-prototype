import * as Core from "../core";
import * as SMUFL from "./";

export class Track implements SMUFL.IPosition {
	bars: SMUFL.Bar[] | [SMUFL.Bar];
	metadata;
	staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
	x = 0;
	y = 0;
	core;
	constructor(track: Core.Track) {
		this.core = track;
		this.bars = track.bars.length
			? track.bars.map((bar) => new SMUFL.Bar(bar, this))
			: [new SMUFL.Bar(new Core.Bar({ track, id: 1, notes: [] }), this)];
		if (track.metadata) this.metadata = new SMUFL.Metadata(track.metadata);
	}
}
