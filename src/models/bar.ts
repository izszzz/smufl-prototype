import Note from "./note";

class Bar {
	notes: Note[];
	prevBar?: Bar;
	nextBar?: Bar;
	constructor(notes: Note[]){
		this.notes = notes
	}
}

export default Bar