import { Midi } from "@tonejs/midi";
import * as R from "remeda";
import { match } from "ts-pattern";
import midi from "../../consts/midi.json";
import * as Core from "../core";

export class midi_importer {
	private data: string;
	mthd: Record<string, string | number> = {};
	private textDecoder = new TextDecoder("utf-8");
	private textEncoder = new TextEncoder();

	constructor(arrayBuffer: ArrayBuffer) {
		const array = new Uint8Array(arrayBuffer);
		this.data = this.textDecoder.decode(array);

		console.log(array);
		console.log(this.data);
		console.log(this.getMThd(array));
		console.log(this.getMTrks(array));
	}
	private getMThd(data: Uint8Array) {
		const { header } = midi.mthd;
		const { position } = header.size;
		const size = this.convertUnit8ArrayToInt(data.slice(...position));
		const chunk = data.slice(
			R.first(header.type.position),
			R.last(position) + size,
		);
		return this.getChunk(header, chunk);
	}
	private getMTrks(data: Uint8Array) {
		const start = R.first(midi.mtrk.position);
		const end = R.last(midi.mtrk.position);
		const result = data.reduce<{
			start: number[];
			end: number[];
			mtrk: number[];
			mtrks: number[][];
		}>(
			// TODO: refactor
			(acc, cur) => {
				// when started
				if (R.equals(acc.start, start)) {
					// search end
					if (cur === end?.[acc.end.length]) {
						acc.end.push(cur);
						//when end
						if (R.equals(acc.end, end)) {
							acc.mtrks.push([...acc.start, ...acc.mtrk]);
							acc.start = [];
							acc.end = [];
							acc.mtrk = [];
							return acc;
						}
					} else {
						acc.end = [];
					}
					acc.mtrk.push(cur);
					return acc;
				}
				// search start
				if (cur === start[acc.start.length]) {
					acc.start.push(cur);
				} else {
					acc.start = [];
				}
				return acc;
			},
			{ start: [], end: [], mtrk: [], mtrks: [] },
		);
		return result.mtrks.map((mtrk) => this.getMTrk(new Uint8Array(mtrk)));
	}
	private getMTrk(data: Uint8Array) {
		return this.getChunk(midi.mtrk.header, data);
	}
	private getChunk(
		header: (typeof midi)[keyof midi]["header"],
		data: Uint8Array,
	) {
		return R.pipe(
			header,
			R.toPairs,
			R.map(([name, header]) => {
				const chunk = data.slice(...header.position);
				const value = match(header)
					.with({ type: "text" }, () => this.textDecoder.decode(chunk))
					.with({ type: "number" }, () => this.convertUnit8ArrayToInt(chunk))
					.with({ type: "unit8array" }, () => {
						console.log(this.textDecoder.decode(chunk));
						console.log(chunk);
						return chunk;
					})
					.exhaustive();
				return { [name]: value };
			}),
			R.mergeAll,
		);
	}
	private convertUnit8ArrayToInt(data: Uint8Array) {
		return parseInt(
			R.pipe(
				Array.from(data),
				R.map((x) => x.toString(16)),
				R.join(""),
			),
			16,
		);
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
