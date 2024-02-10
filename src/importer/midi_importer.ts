import * as R from "remeda";
import midi from "../consts/midi.json";
import * as Core from "../models/core";
import { midiParser } from "../parser/midi_parser";

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
						R.map((x) => x.event),
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
	event: MidiTrackEvent["type"] extends typeof midi.mtrk.metaEvent.type
		? MetaEvent
		: MidiEvent;

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
