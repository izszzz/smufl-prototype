import * as Core from "./";

interface ScoreConstructorArgs {
	tracks: Core.Track[];
	name?: string;
	metadata: Core.Metadata;
}

export class Score implements ScoreConstructorArgs {
	name;
	tracks;
	metadata;
	constructor({ name, tracks, metadata }: ScoreConstructorArgs) {
		this.name = name;
		this.tracks = tracks;
		this.metadata = metadata;
	}
}
