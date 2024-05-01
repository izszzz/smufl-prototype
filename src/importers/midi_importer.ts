import * as R from "remeda";
import midi from "../consts/midi.json";
import * as Core from "../models/core";
import { midiParser } from "../parser/midi_parser";
import { Importer } from "./importer";

// TODO: 休符の扱い

export class MidiImporter implements Importer {
	arrayBuffer;
	constructor(arrayBuffer: ArrayBuffer) {
		this.arrayBuffer = arrayBuffer;
	}
	import() {
		return this.convertScore(this.parseArrayBuffer(this.arrayBuffer));
	}
	parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
		return midiParser.parse(new Uint8Array(arrayBuffer));
	}
	isMetaEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.metaEvent.type;
	}
	isNoteOnEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.midiEvents.noteOn.type;
	}
	isNoteOffEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.midiEvents.noteOff.type;
	}
	convertScore(data: Midi) {
		const { tracks, metadata } = data.mtrks.reduce<{
			tracks: Omit<
				ConstructorParameters<typeof Core.Track>[0],
				"score" | "id"
			>[];
			metadata: Core.Metadata;
		}>(
			(trackAcc, trackCur) => {
				const lastMetaEventIndex = trackCur.events.findIndex(
					(e) => !this.isMetaEvent(e),
				);
				// score metadata
				const metadata = R.pipe(
					trackCur.events.slice(0, lastMetaEventIndex),
					R.map((x) => x.event),
					R.mergeAll,
				) as Partial<MetaEvents>;
				if (metadata.tempo)
					trackAcc.metadata.bpm = Core.convertTempoToBpm(metadata.tempo);
				if (metadata.timeSignature) {
					// @ts-ignore
					// TODO: timeSigの型漬け
					trackAcc.metadata.timeSignature = R.omit(metadata.timeSignature, [
						"clock",
						"bb",
					]);
				}

				const midiNotes = trackCur.events.slice(lastMetaEventIndex).reduce<
					{
						pitch: number;
						noteOn: MidiTrackEvent;
						noteOff: MidiTrackEvent | null;
					}[]
				>((acc, cur) => {
					if (this.isNoteOnEvent(cur)) {
						acc.push({
							pitch: (cur.event as MidiEvent).pitch,
							noteOn: cur,
							noteOff: null,
						});
					}
					if (this.isNoteOffEvent(cur)) {
						const note = acc
							.flat()
							.find(
								(note) =>
									note.pitch === (cur.event as MidiEvent).pitch &&
									R.isNullish(note.noteOff),
							);
						if (note) note.noteOff = cur;
					}
					return acc;
				}, []);
				const { notes } = midiNotes.reduce<{
					time: number;
					notes: ReturnType<typeof Core.Note.build>[];
				}>(
					(acc, cur) => {
						const fraction = this.calcFraction(
							data.mthd.resolution,
							trackAcc.metadata.timeSignature.denominator,
							cur.noteOff?.deltaTime ?? 0,
						);
						const duration = Core.calcNoteDuration(
							fraction,
							trackAcc.metadata.timeSignature.denominator,
						);
						acc.notes.push(
							Core.Note.build({
								pitch: (cur.noteOn.event as MidiEvent).pitch,
								fraction,
								time: new Core.Time({
									start: acc.time,
									duration,
								}),
							}),
						);
						acc.time += duration;
						return acc;
					},
					{ time: 0, notes: [] },
				);
				if (R.isEmpty(notes)) return trackAcc;
				trackAcc.tracks.push({ notes });

				return trackAcc;
			},
			{
				tracks: [],
				metadata: new Core.Metadata(),
			},
		);
		return new Core.Score({ tracks, metadata });
	}
	calcFraction(resolution: number, denominator: number, deltaTime: number) {
		return (resolution * denominator) / deltaTime;
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
	event: MetaEvent | MidiEvent;

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
