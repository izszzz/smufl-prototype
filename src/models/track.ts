// @ts-ignore
import { Track as MidiTrack, Note as MidiNote } from "@tonejs/midi";
import Note from "./note";

class Track{
	notes: Note[] = [];
	constructor(track: MidiTrack){
		this.generateNotes(track.notes)
	}
	private generateNotes(notes: MidiNote[]){
		this.notes = notes.map(note=>new Note(note.durationTicks));
	}
}

export default Track;