interface Midi {
	mthd: {
		header: {
			type: HeaderData;
			length: HeaderData;
			format: HeaderData;
			trackCount: HeaderData;
			deltaTime: HeaderData;
		};
		position: [number[]];
	};
	mtrk: {
		header: {
			type: HeaderData;
			size: HeaderData;
			data: Omit<HeaderData, "position"> & { position: [number] };
		};
		position: [number[], number[]];
		deltaTime: { maxLength: number };
		metaEvent: { prefix: number };
		metaEvents: {
			trackName: MetaEvent;
			endOfTrack: MetaEvent;
		};
	};
}
type HeaderData = {
	type: HeaderDataType;
	position: [number, number];
	length: 4;
};
type HeaderDataType = "text" | "number" | "array";
type MetaEvent = {
	type: number;
	data: MetaEventDataType | null;
};
type MetaEventDataType = "text";

declare const Midi: Midi;

export = Midi;
