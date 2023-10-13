import Bar from "./bar";

interface TrackConstructorArgs{
	bars: Bar[]
	timeSignature?: [number, number]
}

class Track implements TrackConstructorArgs{
	bars;
	timeSignature;
	constructor({bars, timeSignature}: TrackConstructorArgs){
		this.bars = bars
		this.timeSignature = timeSignature
	}
}

export default Track;