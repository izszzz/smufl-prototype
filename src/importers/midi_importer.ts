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
		return this.convertSMUFLData(this.parseArrayBuffer(this.arrayBuffer));
	}
	parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
		return midiParser.parse(new Uint8Array(arrayBuffer));
	}
	isMetaEvent(event: MidiTrackEvent) {
		return event.type === midi.mtrk.metaEvent.type;
	}
	convertSMUFLData(data: Midi) {
		const { tracks, metadata } = data.mtrks.reduce<{
			tracks: Omit<ConstructorParameters<typeof Core.Track>[0], "score">[];
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
				if (R.isDefined(metadata.tempo))
					trackAcc.metadata.bpm = Core.convertTempoToBpm(metadata.tempo);
				if (R.isDefined(metadata.timeSignature)) {
					trackAcc.metadata.timeSignature = R.omit(metadata.timeSignature, [
						"clock",
						"bb",
					]);
				}

				// notes
				const { notes } = trackCur.events.slice(lastMetaEventIndex).reduce<{
					noteOn: MidiTrackEvent | null;
					noteOff: MidiTrackEvent | null;
					notes: Omit<ConstructorParameters<typeof Core.Note>[0], "bar">[];
				}>(
					(acc, cur) => {
						if (cur.type === midi.mtrk.midiEvents.noteOn.type) acc.noteOn = cur;
						if (cur.type === midi.mtrk.midiEvents.noteOff.type)
							acc.noteOff = cur;
						if (R.isDefined(acc.noteOn) && R.isDefined(acc.noteOff)) {
							acc.notes.push({
								pitch: (acc.noteOn.event as MidiEvent).pitch,
								fraction:
									(data.mthd.resolution *
										trackAcc.metadata.timeSignature.denominator) /
									acc.noteOff.deltaTime,
							});
							acc.noteOn = null;
							acc.noteOff = null;
						}
						return acc;
					},
					{ noteOn: null, noteOff: null, notes: [] },
				);
				if (R.isEmpty(notes)) return trackAcc;

				// bars
				const { bars } = notes.reduce<{
					notes: Omit<ConstructorParameters<typeof Core.Note>[0], "bar">[];
					bars: Omit<ConstructorParameters<typeof Core.Bar>[0], "track">[];
				}>(
					(acc, cur, i) => {
						acc.notes.push(cur);
						if (
							notes.length - 1 === i ||
							acc.notes.reduce((acc, cur) => acc + 1 / cur.fraction, 0) === 1
						) {
							acc.bars.push({ notes: acc.notes });
							acc.notes = [];
						}
						return acc;
					},
					{ bars: [], notes: [] },
				);
				trackAcc.tracks.push({ bars });
				return trackAcc;
			},
			{
				tracks: [],
				metadata: new Core.Metadata(),
			},
		);
		return new Core.Score({ tracks, metadata });
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
