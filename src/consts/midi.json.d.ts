interface Midi {
	mthd: {
		header: {
			type: Data;
			size: Data;
			format: Data;
			trackCount: Data;
			deltaTime: Data;
		};
		position: [[77, 84, 104, 100]];
	};
	mtrk: {
		header: {
			type: Data;
			size: Data;
			data: Omit<Data, "position"> & { position: [number] };
		};
		position: [[0, 239, 191, 189], [255, 47, 0]];
	};
}
type Data = { type: Type; position: [number, number] };
type Type = "text" | "number" | "unit8array";

declare const Midi: Midi;

export = Midi;
