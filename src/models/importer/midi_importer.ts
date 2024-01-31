import { Midi } from "@tonejs/midi";
import { Parser } from "binary-parser";
import * as R from "remeda";
import midi from "../../consts/midi.json";
import * as Core from "../core";

export class midi_importer {
	constructor(arrayBuffer: ArrayBuffer) {
		const a = this.parseArrayBuffer(arrayBuffer);
		this.convertMidiToSMUFL(a);
	}

	convertMidiToSMUFL(data: ParsedMidi) {
		console.log(data);
		if (data.mthd.format === 1) {
			const firstTrack = R.first(data.mtrks);
			if (!R.isDefined(firstTrack)) return;
			const result = R.pipe(
				firstTrack.events,
				R.map(({ event, type }) =>
					type === midi.mtrk.metaEvents.type ? event.data : null,
				),
				R.compact,
				R.mergeAll,
			) as MetaEvents;
			new Core.Score({
				name: "",
				tracks: data.mtrks.slice(1).map((mtrk) => {
					const test = mtrk.events.reduce<{
						isMetadata: boolean;
						metadata: TrackEvent[];
						notes: TrackEvent[][];
					}>(
						(acc, cur) => {
							if (acc.isMetadata) {
								if (cur.type === midi.mtrk.metaEvents.type) {
									acc.metadata.push(cur);
									return acc;
								}
								acc.isMetadata = false;
							}
							if (cur.type === midi.mtrk.midiEvents.noteOn.type) {
								acc.notes.push([cur]);
							}
							if (cur.type === midi.mtrk.midiEvents.noteOff.type) {
								R.last(acc.notes)?.push(cur);
							}
							return acc;
						},
						{
							isMetadata: true,
							metadata: [],
							notes: [],
						},
					);
					console.log(test);
					const result = R.pipe(
						mtrk.events,
						R.map(({ event, type }) =>
							type === midi.mtrk.metaEvents.type ? event.data : null,
						),
						R.compact,
						R.mergeAll,
					) as MetaEvents;
					console.log(result);
					return new Core.Track({
						name: result.trackName,
						bars: (() => {
							const bars: Core.Bar[] = [];
							const notes: Core.Note[] = [];
						})(),
					});
				}),
				metadata: new Core.Metadata({
					timeSignature: result.timeSignature,
					bpm: result.bpm,
				}),
			});
		}
	}
	parseArrayBuffer(arrayBuffer: ArrayBuffer): ParsedMidi {
		const array = new Uint8Array(arrayBuffer);
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
				readUntil: (item, buffer) => {
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					// if (!R.isDefined(prevReadUntil)) return false;
					console.log(
						{ item },
						{ buffer },
						!(item & midi.mtrk.deltaTime.readUntil),
					);

					const readUntil = prevReadUntil;
					prevReadUntil = !(item & midi.mtrk.deltaTime.readUntil);
					return readUntil;
				},
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
				formatter: (item) => {
					console.log(item);
					return item;
				},
			});
		const midiHeaderChunk = new Parser()
			.string("type", { length: midi.mthd.header.type.length })
			.uint32("length")
			.uint16("format")
			.uint16("trackCount")
			.uint16("deltaTimeUnit");
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
		events: TrackEvent[];
	}[];
}
interface TrackEvent {
	channel: number;
	deltaTime: Uint8Array;
	event: {
		data: TrackEvent["type"] extends typeof midi.mtrk.metaEvents.type
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
