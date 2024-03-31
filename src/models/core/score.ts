import * as R from "remeda";
import * as Core from "./";

interface ScoreConstructorArgs {
	name?: string;
	tracks:
		| Core.Track[]
		| Omit<ConstructorParameters<typeof Core.Track>[0], "score">[];
	metadata?: Core.Metadata;
}

export class Score {
	name;
	tracks: Core.Track[] = [];
	metadata;
	constructor({ name, tracks, metadata }: ScoreConstructorArgs) {
		this.name = name;
		this.metadata = metadata ?? new Core.Metadata();
		this.tracks = tracks.map((track) =>
			track instanceof Core.Track
				? track
				: new Core.Track({ ...track, score: this }),
		);
	}
	get endTime() {
		return (
			R.pipe(
				this.tracks,
				R.map((track) => R.last(track.notes)),
				R.compact,
				R.maxBy((note) => note?.endTime),
			)?.endTime ?? 0
		);
	}
}
