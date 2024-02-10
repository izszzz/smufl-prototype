interface Midi {
	mthd: {
		header: {
			type: HeaderData;
		};
	};
	mtrk: {
		header: {
			type: HeaderData;
		};
		deltaTime: { readUntil: number };
		tempo: { divideSeconds: number };
		metaEvent: EventPrefix;
		sysExEvent: EventPrefix;
		midiEvent: EventPrefix;
		metaEvents: {
			text: MetaEvent;
			copyright: MetaEvent;
			sequenceNumber: MetaEvent;
			trackName: MetaEvent;
			instrumentName: MetaEvent;
			marker: MetaEvent;
			deviceName: MetaEvent;
			endOfTrack: MetaEvent;
			bpm: MetaEvent;
			timeSignature: MetaEvent;
			keySignature: MetaEvent;
		};
		midiEvents: {
			noteOff: MidiEvent;
			noteOn: MidiEvent;
		};
	};
}
type HeaderData = {
	length: number;
};
type MetaEvent = {
	name: string;
	type: number;
};
type MidiEvent = {
	type: number | number[];
	channel: number | number[];
};
type EventPrefix = {
	type: number;
	channel?: number;
};

declare const Midi: Midi;

export = Midi;
