interface NoteConstructorArgs{
	durationTicks: number;
	pitch: number;
	prevNote?: Note;
	nextNote?: Note;
}

class Note{
	durationTicks: number;
	pitch: number;
	prevNote?: Note;
	nextNote?: Note;
	constructor({durationTicks, pitch, prevNote, nextNote}:NoteConstructorArgs){
		this.durationTicks = durationTicks
		this.pitch = pitch;
		this.nextNote = nextNote;
		this.prevNote = prevNote;
	}
}

export default Note;