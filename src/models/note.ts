interface NoteConstructorArgs{
	fraction: number;
	pitch: number;
	prevNote?: Note;
	nextNote?: Note;
}

class Note implements NoteConstructorArgs{
	fraction
	pitch
	prevNote
	nextNote
	constructor({fraction, pitch, prevNote, nextNote}:NoteConstructorArgs){
		this.fraction = fraction
		this.pitch = pitch;
		this.nextNote = nextNote;
		this.prevNote = prevNote;
	}
}

export default Note;