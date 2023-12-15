import { Bar } from "./bar";

interface TrackConstructorArgs {
	bars: Bar[];
	timeSignature?: [number, number];
}

export class Track implements TrackConstructorArgs {
	bars;
	timeSignature;
	name?: string;
	constructor({ bars, timeSignature }: TrackConstructorArgs) {
		this.bars = bars;
		this.timeSignature = timeSignature;
	}
}
