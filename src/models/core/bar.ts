import { Note } from "./note";

interface BarConstructorArgs{
	notes: Note[]
	timeSignature?: [number, number]
}

export class Bar implements BarConstructorArgs{
	notes
	timeSignature
	prev?: Bar;
	next?: Bar;
	constructor({notes, timeSignature}: BarConstructorArgs){
		this.notes = notes
		this.timeSignature = timeSignature
	}
}