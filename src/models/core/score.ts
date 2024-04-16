import * as Core from "./";

interface IScore {
	name?: string;
	tracks:
		| Core.Track[]
		| Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id">[];
	metadata?: Core.Metadata;
}

export class Score implements IScore {
	name;
	tracks;
	metadata;
	constructor({ name, tracks, metadata }: IScore) {
		this.name = name;
		this.metadata = metadata ?? new Core.Metadata();
		this.tracks = tracks.map((track, id) =>
			track instanceof Core.Track
				? track
				: new Core.Track({ id, ...track, score: this }),
		);
	}
}
