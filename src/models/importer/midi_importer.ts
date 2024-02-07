import { Parser } from "binary-parser";
import * as R from "remeda";
import midi from "../../consts/midi.json";
import * as Core from "../core";

// TODO: 休符の扱い

export class MidiImporter {
	score: Core.Score;
	constructor(arrayBuffer: ArrayBuffer) {
		const result = this.convertMidiToSMUFL(this.parseArrayBuffer(arrayBuffer));
		//@ts-ignore
		this.score = result;
	}

	// TODO: リファクタ
	convertMidiToSMUFL(data: Midi) {
		if (data.mthd.format === 1) {
			const tracks = data.mtrks.reduce<{
				tracks: Core.Track[];
				scoreMetadata: Core.Metadata;
			}>(
				(acc, cur) => {
					const lastMetaEventIndex = cur.events.findIndex(
						(e) => !this.isMetaEvent(e),
					);
					const metadata = R.pipe(
						cur.events.slice(0, lastMetaEventIndex),
						R.map((x) => x.event.data),
						R.mergeAll,
					) as Partial<MetaEvents>;

					if (R.isDefined(metadata.bpm)) {
						acc.scoreMetadata.bpm = metadata.bpm;
					}
					if (R.isDefined(metadata.timeSignature)) {
						acc.scoreMetadata.timeSignature = R.omit(metadata.timeSignature, [
							"clock",
							"bb",
						]);
					}

					const midiNotes = cur.events
						.slice(lastMetaEventIndex)
						.reduce<MidiTrackEvent[][]>((acc, cur) => {
							if (cur.type === midi.mtrk.midiEvents.noteOn.type)
								acc.push([cur]);
							if (cur.type === midi.mtrk.midiEvents.noteOff.type)
								R.last(acc)?.push(cur);
							return acc;
						}, []);
					if (R.isEmpty(midiNotes)) return acc;
					acc.tracks.push(
						new Core.Track({
							name: metadata.trackName,
							bars: (() => {
								const bars: Core.Bar[] = [];
								const notes: Core.Note[] = [];
								let barNotes: Core.Note[] = [];
								let barSize = 0;
								for (const noteData of midiNotes) {
									const [noteOn, noteOff] = noteData;
									const fraction =
										(data.mthd.resolution *
											acc.scoreMetadata.timeSignature?.denominator) /
										noteOff.deltaTime;
									const note = new Core.Note({
										fraction,
										// @ts-ignore
										pitch: noteOn.event.pitch,
									});
									barSize +=
										noteOff.deltaTime /
										(data.mthd.resolution *
											acc.scoreMetadata.timeSignature?.numerator);
									notes.push(note);
									barNotes.push(note);
									if (barSize >= 1) {
										bars.push(new Core.Bar({ notes: barNotes }));
										barNotes = [];
										barSize = 0;
									}
								}
								if (barNotes.length)
									bars.push(new Core.Bar({ notes: barNotes }));
								Core.setPrevAndNext(notes);
								Core.setPrevAndNext(bars);
								return bars;
							})(),
						}),
					);
					return acc;
				},
				{
					tracks: [],
					scoreMetadata: new Core.Metadata(),
				},
			);
			return new Core.Score({
				name: "",
				tracks: tracks.tracks,
				metadata: tracks.scoreMetadata,
			});
		}
	}
	parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
		return midiParser.parse(new Uint8Array(arrayBuffer));
	}
	isMetaEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.metaEvent.type;
	}
}
const { metaEvents } = midi.mtrk;
const metaEventChoice = (
	metaEvent: keyof typeof metaEvents,
	parser: (parser: Parser, name: string, length: { length: string }) => Parser,
) => ({
	[metaEvents[metaEvent].type]: parser(
		new Parser(),
		metaEvents[metaEvent].name,
		{ length: "$parent.length" },
	),
});
const midiEventParser = new Parser().uint8("pitch").uint8("velocity");
const metaEventParser = new Parser()
	.uint8("type")
	.uint8("length")
	.choice("data", {
		tag: "type",
		choices: {
			...metaEventChoice("sequenceNumber", (p, n, l) => p.string(n, l)),
			...metaEventChoice("text", (p, n, l) => p.string(n, l)),
			...metaEventChoice("copyright", (p, n, l) => p.string(n, l)),
			...metaEventChoice("trackName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("instrumentName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("marker", (p, n, l) => p.string(n, l)),
			...metaEventChoice("deviceName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("endOfTrack", (p, n, l) => p.string(n, l)),
			...metaEventChoice("bpm", (p, n, l) =>
				p.bit24(n, {
					...l,
					formatter: (item) => Math.floor(midi.mtrk.tempo.divideSeconds / item),
				}),
			),
			...metaEventChoice("timeSignature", (p, n, l) =>
				p.nest(n, {
					type: new Parser()
						.uint8("numerator")
						.uint8("denominator", { formatter: (item) => item ** 2 })
						.uint8("clock")
						.uint8("bb"),
				}),
			),
			...metaEventChoice("keySignature", (p, n, l) =>
				p.nest(n, {
					type: new Parser()
						.bit4("sharp")
						.bit4("flat")
						.bit4("major")
						.bit4("minor"),
				}),
			),
		},
		defaultChoice: new Parser().buffer("buffer", {
			length: "$parent.length",
		}),
	});
let prevReadUntil = false;
const midiTrackEventParser = new Parser()
	.buffer("deltaTime", {
		readUntil: (item) => {
			const readUntil = prevReadUntil;
			prevReadUntil = !(item & midi.mtrk.deltaTime.readUntil);
			return readUntil;
		},
		// TODO: 繰り返し文に直す
		formatter: (item: Uint8Array) => ((item[0] & 0x7f) << 7) | (item[1] & 0x7f),
	})
	.bit4("type")
	.bit4("channel")
	.choice("event", {
		tag: "type",
		choices: {
			[midi.mtrk.midiEvents.noteOff.type]: midiEventParser,
			[midi.mtrk.midiEvents.noteOn.type]: midiEventParser,
			[midi.mtrk.metaEvent.type]: metaEventParser,
		},
	});
const midiHeaderChunk = new Parser()
	.string("type", { length: midi.mthd.header.type.length })
	.uint32("length")
	.uint16("format")
	.uint16("trackCount")
	.uint16("resolution");
const midiTrackChunk = new Parser()
	.string("type", {
		length: midi.mtrk.header.type.length,
	})
	.uint32("length")
	.array("events", {
		type: midiTrackEventParser,
		readUntil: (item) =>
			item?.event.type === midi.mtrk.metaEvents.endOfTrack.type,
	});
const midiParser = new Parser()
	.useContextVars()
	.nest("mthd", { type: midiHeaderChunk })
	.array("mtrks", { type: midiTrackChunk, length: "mthd.trackCount" });
interface Midi {
	mthd: {
		type: string;
		length: number;
		format: number;
		trackCount: number;
		resolution: number;
	};
	mtrks: {
		type: string;
		events: MidiTrackEvent[];
	}[];
}
interface MidiTrackEvent {
	channel: number;
	deltaTime: number;
	event: {
		data: MidiTrackEvent["type"] extends typeof midi.mtrk.metaEvent.type
			? MetaEvent
			: MidiEvent;
	};
	type:
		| typeof midi.mtrk.metaEvent.type
		| typeof midi.mtrk.midiEvents.noteOn.type
		| typeof midi.mtrk.midiEvents.noteOff.type;
}
interface MidiEvent {
	pitch: number;
	velocity: number;
}
interface MetaEvent {
	data: Partial<MetaEvents>;
	length: number;
	type: number;
}
interface MetaEvents {
	trackName: string;
	instrumentName: string;
	marker: string;
	deviceName: string;
	endOfTrack: string;
	bpm: number;
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
