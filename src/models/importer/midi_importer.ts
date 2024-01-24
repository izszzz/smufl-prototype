import { Midi } from "@tonejs/midi";
import { Parser } from "binary-parser";
import midi from "../../consts/midi.json";
import * as Core from "../core";

export class midi_importer {
	mthd: object = {};
	mtrks: object = {};

	constructor(arrayBuffer: ArrayBuffer) {
		const array = new Uint8Array(arrayBuffer);

		console.log(array);
		console.log(this.mthd);
		console.log(this.mtrks);
		const formatter = (item: number) => {
			console.log(item);
			return item;
		};
		const midiEventParser = new Parser()
			// .uint8("channel")
			.uint8("note")
			.uint8("velocity");
		const metaEventParser = new Parser()
			// .bit4("status")
			.uint8("type")
			.uint8("length")
			.buffer("data", { length: "length" });
		const midiTrackEventParser = new Parser()
			.buffer("deltaTime", {
				readUntil: (item) => item > 128,
			})
			.bit4("prefix")
			.choice("event", {
				tag: "prefix",
				choices: {
					8: midiEventParser,
					9: midiEventParser,
					15: metaEventParser,
				},
				formatter,
			});

		const midiHeaderChunk = new Parser()
			.string("type", { length: midi.mthd.header.type.length })
			.uint32("length")
			.uint16("format")
			.uint16("trackCount")
			.uint16("deltaTime");
		const midiTrackChunk = new Parser()
			.string("type", {
				length: midi.mtrk.header.type.length,
			})
			.array("events", {
				type: midiTrackEventParser,
				readUntil: (item) => item?.event.type === 47,
			});
		const midiParser = new Parser()
			.nest("mthd", { type: midiHeaderChunk })
			.array("mtrks", { type: midiTrackChunk, length: "mthd.trackCount" });
		console.log(midiParser.parse(array));
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
