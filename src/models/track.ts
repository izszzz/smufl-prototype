import * as R from 'remeda';
// @ts-ignore
import { Track as MidiTrack, Note as MidiNote } from "@tonejs/midi";
import Note from "./note";

class Track{
	notes: Note[];
	constructor(track: MidiTrack){
		this.notes = this.generateNotes(track.notes)
	}
	private generateNotes(notes: MidiNote[]){
		return notes
			.map(({durationTicks, midi}) => new Note({durationTicks, pitch: midi}))
			.map((note, index, array)=> {
				const prevNote = array[index - 1]
				if(prevNote) {
					prevNote.nextNote = note
					note.prevNote = prevNote
				}
				return note
			})
	}
}

export default Track;