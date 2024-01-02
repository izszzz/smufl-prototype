import * as Core from "./";

interface BarConstructorArgs {
	notes: Core.Note[];
	metadata?: Core.Metadata;
}

export class Bar implements BarConstructorArgs {
	notes;
	prev?: Bar;
	next?: Bar;
	metadata;
	constructor({ notes, metadata }: BarConstructorArgs) {
		this.notes = notes;
		this.metadata = metadata;
	}
}
