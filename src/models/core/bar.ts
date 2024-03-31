import * as Core from "./";

interface BarConstructorArgs {
	track: Core.Track;
	metadata?: Core.Metadata;
	prev?: Bar;
	next?: Bar;
	notes:
		| Core.Note[]
		| Omit<ConstructorParameters<typeof Core.Note>[0], "bar">[];
}

export class Bar {
	notes: Core.Note[] = [];
	prev;
	next;
	track: Core.Track;
	metadata: Core.Metadata;
	constructor({ track, metadata, prev, next, notes }: BarConstructorArgs) {
		this.next = next;
		this.prev = prev;
		this.track = track;
		this.metadata = metadata ?? track.score.metadata;
		this.notes = notes.map((note) =>
			note instanceof Core.Note ? note : new Core.Note({ ...note, bar: this }),
		);
	}
}
