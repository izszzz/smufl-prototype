import * as R from "remeda";
import * as Core from "./";

interface TrackConstructorArgs {
	bars: Core.Bar[] | Omit<ConstructorParameters<typeof Core.Bar>[0], "track">[];
	score: Core.Score;
	timeSignature?: [number, number];
	name?: string;
	preset?: number;
}

export class Track implements TrackConstructorArgs {
	bars: Core.Bar[];
	notes: Core.Note[];
	timeSignature;
	name;
	score;
	preset = 54;
	constructor({ name, bars, score, timeSignature }: TrackConstructorArgs) {
		this.score = score;
		this.timeSignature = timeSignature;
		this.name = name;
		this.bars = bars.map((bar) =>
			bar instanceof Core.Bar ? bar : new Core.Bar({ ...bar, track: this }),
		);
		this.notes = this.bars.flatMap((bar) => bar.notes);
		Core.setPrevAndNext(this.bars);
		Core.setPrevAndNext(this.notes);
	}
	get endTime() {
		return R.last(this.notes)?.endTime ?? 0;
	}
}
