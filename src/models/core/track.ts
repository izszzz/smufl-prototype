import * as Core from "./";

interface TrackConstructorArgs {
	bars: Core.Bar[];
	timeSignature?: [number, number];
	name?: string;
}

export class Track implements TrackConstructorArgs {
	bars;
	timeSignature;
	name?: string;
	constructor({ name, bars, timeSignature }: TrackConstructorArgs) {
		this.bars = bars;
		this.timeSignature = timeSignature;
		this.name = name;
	}
}
