// @ts-ignore
import { Midi } from "@tonejs/midi";
import Score from "../score";
import Track from "../track";
import Bar from "../bar";
import Note from "../note";


export const MIDIImporter = async (): Promise<Score> => {
	const midi = await Midi.fromUrl(`${process.env.PUBLIC_URL}/tests/test2.mid`)
	const { name, tracks } = midi;
	return new Score({
			title: name, 
			tracks: tracks.map(({notes}) =>
				new Track((()=>{
						const bars: Bar[] = []
						let barNotes: Note[] = []
						let barSize = 0
						notes.forEach(({durationTicks, midi: pitch}) => {
							barSize += durationTicks / (480 * 4) 
							barNotes.push(new Note({durationTicks, pitch}))
							if(barSize >= 1) {
								bars.push(new Bar(barNotes))
								barNotes = []
								barSize = 0
							}
						})
						if(barNotes.length) bars.push(new Bar(barNotes))
						bars.forEach((bar, i, array) => {
							const prevBar = array[i - 1]
							if(prevBar) {
								bar.prevBar = prevBar
								prevBar.nextBar = bar 
							}
						})
						return bars
				})())
			)
		})
}