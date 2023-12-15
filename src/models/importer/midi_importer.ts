import { Midi } from "@tonejs/midi";
import { parseArrayBuffer } from "midi-json-parser";
import * as R from "remeda";
import * as Core from "../core";

export const midi_importer = async (arrayBuffer: ArrayBuffer) => {
	const midi = await parseArrayBuffer(arrayBuffer);
	const timeSignature = [];
	console.log(midi);
	for (const track of midi.tracks) {
		for (const midiEvent of track) {
			if (
				midiEvent.timeSignature !== null &&
				typeof midiEvent.timeSignature === "object" &&
				"denominator" in midiEvent.timeSignature
			) {
				const { denominator, numerator } = midiEvent.timeSignature;
				const metadata = new Core.Metadata({
					timeSignature: {
						denominator: denominator as number,
						numerator: numerator as number,
					},
				});
			}
		}
	}
	const header = R.first(midi.tracks);
	// return new Core.Score({
	// 		name,
	// 		bpm: tempos.length ? tempos[0].bpm : undefined,
	// 		timeSignature: timeSignatures.length ? [timeSignatures[0].timeSignature[0], timeSignatures[0].timeSignature[1]] : undefined,
	// 		tracks: tracks.map(({notes: midiNotes}) =>
	// 			new Core.Track({bars:(()=>{
	// 				const bars: Core.Bar[] = []
	// 				const notes: Core.Note[] = []
	// 				let barNotes: Core.Note[] = []
	// 				let barSize = 0
	// 				midiNotes.forEach(({durationTicks, midi: pitch}) => {
	// 					const fraction = 480 * 4 / durationTicks
	// 					const note = new Core.Note({fraction, pitch})
	// 					barSize += durationTicks / (480 * 4)
	// 					notes.push(note)
	// 					barNotes.push(note)
	// 					if(barSize >= 1) {
	// 						bars.push(new Core.Bar({notes: barNotes}))
	// 						barNotes = []
	// 						barSize = 0
	// 					}
	// 				})
	// 				if(barNotes.length) bars.push(new Core.Bar({notes: barNotes}))
	// 				notes.forEach((note, i, array) => {
	// 					const prevNote = array[i - 1]
	// 					if(!prevNote) return
	// 					note.prevNote = prevNote
	// 					prevNote.nextNote = note
	// 				})
	// 				bars.forEach((bar, i, array) => {
	// 					const prevBar = array[i - 1]
	// 					if(!prevBar)  return
	// 					bar.prev = prevBar
	// 					prevBar.next = bar
	// 				})
	// 				return bars
	// 			})()})
	// 		)
	// 	})
};
export const MIDIImporter = async (): Promise<Core.Score> => {
	const midi = await Midi.fromUrl(
		`${process.env.PUBLIC_URL}/tests/2tracktest.mid`,
	);
	const {
		name,
		tracks,
		header: { tempos, timeSignatures },
	} = midi;
	return new Core.Score({
		name,
		bpm: tempos.length ? tempos[0].bpm : undefined,
		timeSignature: timeSignatures.length
			? [timeSignatures[0].timeSignature[0], timeSignatures[0].timeSignature[1]]
			: undefined,
		tracks: tracks.map(
			({ notes: midiNotes }) =>
				new Core.Track({
					bars: (() => {
						const bars: Core.Bar[] = [];
						const notes: Core.Note[] = [];
						let barNotes: Core.Note[] = [];
						let barSize = 0;
						// biome-ignore lint/complexity/noForEach: <explanation>
						midiNotes.forEach(({ durationTicks, midi: pitch }) => {
							const fraction = (480 * 4) / durationTicks;
							const note = new Core.Note({ fraction, pitch });
							barSize += durationTicks / (480 * 4);
							notes.push(note);
							barNotes.push(note);
							if (barSize >= 1) {
								bars.push(new Core.Bar({ notes: barNotes }));
								barNotes = [];
								barSize = 0;
							}
						});
						if (barNotes.length) bars.push(new Core.Bar({ notes: barNotes }));
						// biome-ignore lint/complexity/noForEach: <explanation>
						notes.forEach((note, i, array) => {
							const prevNote = array[i - 1];
							if (!prevNote) return;
							note.prevNote = prevNote;
							prevNote.nextNote = note;
						});
						// biome-ignore lint/complexity/noForEach: <explanation>
						bars.forEach((bar, i, array) => {
							const prevBar = array[i - 1];
							if (!prevBar) return;
							bar.prev = prevBar;
							prevBar.next = bar;
						});
						return bars;
					})(),
				}),
		),
	});
};
