import * as Core from "./";

interface IBar extends IConstructor {
	getMetadata: () => Core.Metadata;
}
interface IConstructor extends Core.ILink<Bar> {
	id: number;
	track: Core.Track;
	metadata?: Core.Metadata;
	notes: (
		| Core.Note
		| Omit<ConstructorParameters<typeof Core.Note>[0], "bar">
	)[];
}

export class Bar implements IBar {
	id;
	notes;
	track;
	metadata?;
	prev?: Bar;
	next?: Bar;
	constructor({ id, track, metadata, prev, next, notes }: IConstructor) {
		this.id = id;
		this.next = next;
		this.prev = prev;
		this.track = track;
		this.metadata = metadata;
		this.notes = notes.map((note) =>
			note instanceof Core.Note ? note : new Core.Note(note),
		);
	}
	getMetadata() {
		return this.metadata ?? this.track.getMetadata();
	}
}
