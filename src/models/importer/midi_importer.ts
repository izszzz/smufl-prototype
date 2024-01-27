import { Midi } from "@tonejs/midi";
import { Parser } from "binary-parser";
import midi from "../../consts/midi.json";
import * as Core from "../core";

export class midi_importer {
	constructor(arrayBuffer: ArrayBuffer) {
		const a = this.convertArrayBufferToMidi(arrayBuffer);
		this.convertMidiToSMUFL(a);
	}

	convertMidiToSMUFL(midi: ParsedMidi) {}
	convertArrayBufferToMidi(arrayBuffer: ArrayBuffer): ParsedMidi {
		const array = new Uint8Array(arrayBuffer);
		const { metaEvents } = midi.mtrk;
		const midiEventParser = new Parser().uint8("note").uint8("velocity");
		const metaEventParser = new Parser()
			.uint8("type")
			.uint8("length")
			.choice("data", {
				tag: "type",
				choices: {
					[metaEvents.trackName.type]: new Parser().string(
						metaEvents.trackName.name,
						{ length: "$parent.length" },
					),
					[metaEvents.instrumentName.type]: new Parser().string(
						metaEvents.instrumentName.name,
						{ length: "$parent.length" },
					),
					[metaEvents.marker.type]: new Parser().string(
						metaEvents.marker.name,
						{ length: "$parent.length" },
					),
					[metaEvents.deviceName.type]: new Parser().string(
						metaEvents.deviceName.name,
						{ length: "$parent.length" },
					),
					[metaEvents.endOfTrack.type]: new Parser().string(
						metaEvents.endOfTrack.name,
						{ length: "$parent.length" },
					),
					[metaEvents.tempo.type]: new Parser().bit24(metaEvents.tempo.name, {
						length: "$parent.length",
						formatter: (item) => 60000000 / item,
					}),
					[metaEvents.timeSignature.type]: new Parser().nest(
						metaEvents.timeSignature.name,
						{
							type: new Parser()
								.uint8("numerator")
								.uint8("denominator", { formatter: (item) => item ** 2 })
								.uint8("clock")
								.uint8("bb"),
						},
					),
					[metaEvents.keySignature.type]: new Parser().nest(
						metaEvents.keySignature.name,
						{
							type: new Parser()
								.bit4("sharp")
								.bit4("flat")
								.bit4("major")
								.bit4("minor"),
						},
					),
				},
				defaultChoice: new Parser().buffer("buffer", {
					length: "$parent.length",
				}),
			});
		const midiTrackEventParser = new Parser()
			.buffer("deltaTime", {
				readUntil: (item) => item > midi.mtrk.deltaTime.endOfFlag,
			})
			.bit4("type")
			.bit4("channel")
			.choice("event", {
				tag: "type",
				choices: {
					8: midiEventParser,
					9: midiEventParser,
					15: metaEventParser,
				},
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
				readUntil: (item) =>
					item?.event.type === midi.mtrk.metaEvents.endOfTrack.type,
			});
		const midiParser = new Parser()
			.useContextVars()
			.nest("mthd", { type: midiHeaderChunk })
			.array("mtrks", { type: midiTrackChunk, length: "mthd.trackCount" });
		return midiParser.parse(array);
	}
}
interface ParsedMidi {
	mthd: {
		type: string;
		length: number;
		format: number;
		trackCount: number;
		deltaTime: number;
	};
	mtrks: {
		type: string;
		events: {
			channel: number;
			deltaTime: Uint8Array;
			event: { data: MidiEvent | Partial<MetaEvent> };
			type: number;
		};
	};
}
interface MidiEvent {
	note: number;
	velocity: number;
}
interface MetaEvent {
	data: MetaEvents;
	length: number;
	type: number;
}
interface MetaEvents {
	trackName: string;
	instrumentName: string;
	marker: string;
	deviceName: string;
	endOfTrack: string;
	tempo: number;
	timeSignature: {
		numerator: number;
		denominator: number;
		clock: number;
		bb: number;
	};
	keySignature: {
		sharp: number;
		flat: number;
		major: number;
		minor: number;
	};
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
