import { Midi } from "@tonejs/midi";
import * as Core from "../core";

export class midi_importer {
	constructor(arrayBuffer: ArrayBuffer) {
		const decoder = new TextDecoder("utf-8");
		const encoder = new TextEncoder();
		const uint8Array = new Uint8Array(arrayBuffer);
		const data = decoder.decode(uint8Array);
		console.log({ data });
		console.log(data);
		console.log(this.getMThd(data));
		console.log(this.getMTrk(data));
	}
	private getMThd(data: string) {
		return data.match(/MThd(.*?)�/)?.[0];
	}
	private getMTrk(data: string) {
		return data.match(/MTrk(.*?)�\//g);
	}
}

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
		metadata: new Core.Metadata({
			timeSignature: {
				numerator: timeSignatures[0].timeSignature[0] ?? 4,
				denominator: timeSignatures[0].timeSignature[1] ?? 4,
			},
			bpm: tempos.length ? tempos[0].bpm : 120,
		}),
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
