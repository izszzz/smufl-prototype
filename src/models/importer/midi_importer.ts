// @ts-ignore
import { Midi } from "@tonejs/midi";
import { Track } from "../core/track";
import { Bar } from "../core/bar";
import { Note } from "../core/note";
import { Score } from "../core/score";


export const MIDIImporter = async (): Promise<Score> => {
	const midi = await Midi.fromUrl(`${process.env.PUBLIC_URL}/tests/test2.mid`)
	console.log(midi)
	const { name, tracks, header: { tempos, timeSignatures } } = midi;
	return new Score({
			name, 
			bpm: tempos.length ? tempos[0].bpm : undefined,
			timeSignature: timeSignatures.length ? [timeSignatures[0].timeSignature[0], timeSignatures[0].timeSignature[1]] : undefined,
			tracks: tracks.map(({notes: midiNotes}) =>
				new Track({bars:(()=>{
					const bars: Bar[] = []
					const notes: Note[] = []
					let barNotes: Note[] = []
					let barSize = 0
					midiNotes.forEach(({durationTicks, midi: pitch}) => {
						const fraction = 480 * 4 / durationTicks 
						const note = new Note({fraction, pitch})
						barSize += durationTicks / (480 * 4) 
						notes.push(note)
						barNotes.push(note)
						if(barSize >= 1) {
							bars.push(new Bar({notes: barNotes}))
							barNotes = []
							barSize = 0
						}
					})
					if(barNotes.length) bars.push(new Bar({notes: barNotes}))
					notes.forEach((note, i, array) => {
						const prevNote = array[i - 1]
						if(!prevNote) return
						note.prevNote = prevNote
						prevNote.nextNote = note 
					})
					bars.forEach((bar, i, array) => {
						const prevBar = array[i - 1]
						if(!prevBar)  return
						bar.prevBar = prevBar
						prevBar.nextBar = bar 
					})
					return bars
				})()})
			)
		})
}