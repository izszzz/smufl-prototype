import Note from "./note";

interface BarConstructorArgs{
	notes: Note[];
}
class Bar {
	notes: Note[];
	constructor({notes}:BarConstructorArgs){
		this.notes = notes
	}
}

export default Bar