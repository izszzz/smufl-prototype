import { Parser } from "binary-parser";
import * as R from "remeda";
import midi from "../../consts/midi.json";
import * as Core from "../core";

// TODO: 休符の扱い

export class midi_importer {
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
				conductorTrack: MetaEvents | null;
			}>(
				(acc, cur) => {
					const metaEventIndex = cur.events.findIndex(
						(e) => !this.isMetaEvent(e),
					);
					if (metaEventIndex === -1) {
						acc.conductorTrack = R.pipe(
							cur.events,
							R.map((x) => x.event.data),
							R.mergeAll,
						) as MetaEvents;
						return acc;
					}
					const metadata = R.pipe(
						cur.events.slice(0, metaEventIndex),
						R.map((x) => x.event.data),
						R.mergeAll,
					) as MetaEvents;
					const track = cur.events
						.slice(metaEventIndex)
						.reduce<MidiTrackEvent[][]>((acc, cur) => {
							if (cur.type === midi.mtrk.midiEvents.noteOn.type)
								acc.push([cur]);
							if (cur.type === midi.mtrk.midiEvents.noteOff.type)
								R.last(acc)?.push(cur);
							return acc;
						}, []);
					acc.tracks.push(
						new Core.Track({
							name: metadata.trackName,
							bars: (() => {
								const bars: Core.Bar[] = [];
								const notes: Core.Note[] = [];
								let barNotes: Core.Note[] = [];
								let barSize = 0;
								for (const noteData of track) {
									const [noteOn, noteOff] = noteData;
									// TODO: 定数
									const fraction =
										(data.mthd.resolution *
											(acc.conductorTrack?.timeSignature.denominator ?? 4)) /
										noteOff.deltaTime;
									const note = new Core.Note({
										fraction,
										// @ts-ignore
										pitch: noteOn.event.pitch,
									});
									// TODO: 定数
									barSize +=
										noteOff.deltaTime /
										(data.mthd.resolution *
											(acc.conductorTrack?.timeSignature.numerator ?? 4));
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
					conductorTrack: null,
				},
			);
			return new Core.Score({
				name: "",
				tracks: tracks.tracks,
				metadata: new Core.Metadata({
					//TODO: 定数
					timeSignature: tracks.conductorTrack?.timeSignature ?? {
						numerator: 4,
						denominator: 4,
					},
					//TODO: 定数
					bpm: tracks.conductorTrack?.bpm ?? 120,
				}),
			});
		}
	}
	parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
		return midiParser.parse(new Uint8Array(arrayBuffer));
	}
	isMetaEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.metaEvents.type;
	}
}
const { metaEvents } = midi.mtrk;
const midiEventParser = new Parser().uint8("pitch").uint8("velocity");
const metaEventParser = new Parser()
	.uint8("type")
	.uint8("length")
	.choice("data", {
		tag: "type",
		choices: {
			[metaEvents.sequenceNumber.type]: new Parser().string(
				metaEvents.sequenceNumber.name,
				{ length: "$parent.length" },
			),
			[metaEvents.trackName.type]: new Parser().string(
				metaEvents.trackName.name,
				{ length: "$parent.length" },
			),
			[metaEvents.instrumentName.type]: new Parser().string(
				metaEvents.instrumentName.name,
				{ length: "$parent.length" },
			),
			[metaEvents.marker.type]: new Parser().string(metaEvents.marker.name, {
				length: "$parent.length",
			}),
			[metaEvents.deviceName.type]: new Parser().string(
				metaEvents.deviceName.name,
				{ length: "$parent.length" },
			),
			[metaEvents.endOfTrack.type]: new Parser().string(
				metaEvents.endOfTrack.name,
				{ length: "$parent.length" },
			),
			[metaEvents.bpm.type]: new Parser().bit24(metaEvents.bpm.name, {
				length: "$parent.length",
				formatter: (item) => midi.mtrk.tempo.divideSeconds / item,
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
			[midi.mtrk.metaEvents.type]: metaEventParser,
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
		data: MidiTrackEvent["type"] extends typeof midi.mtrk.metaEvents.type
			? MetaEvent
			: MidiEvent;
	};
	type:
		| typeof midi.mtrk.metaEvents.type
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
