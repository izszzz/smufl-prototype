interface NoteConstructorArgs {
	fraction: number;
	pitch: number;
	prev?: Note;
	next?: Note;
}
export class Note implements NoteConstructorArgs {
	fraction;
	pitch;
	prev;
	next;
	constructor({
		fraction,
		pitch,
		prev: prevNote,
		next: nextNote,
	}: NoteConstructorArgs) {
		this.fraction = fraction;
		this.pitch = pitch;
		this.next = nextNote;
		this.prev = prevNote;
	}
}
