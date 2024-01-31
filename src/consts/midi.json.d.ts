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
		metaEvents: {
			type: number;
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
	type: HeaderDataType;
	position: [number, number];
	length: 4;
};
type MetaEvent = {
	name: string;
	type: number;
};
type MidiEvent = {
	type: number;
};

declare const Midi: Midi;

export = Midi;
