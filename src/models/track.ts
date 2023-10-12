import Bar from "./bar";

class Track{
	bars: Bar[];
	beat = 4;
	constructor(bars: Bar[] ){
		this.bars = bars
	}
}

export default Track;