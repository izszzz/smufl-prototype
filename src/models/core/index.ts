export * from "./bar";
export * from "./note";
export * from "./score";
export * from "./track";
export * from "./metadata";
export * from "./time";
export * from "./link";

export const setPrevAndNext = <T extends { prev?: T; next?: T }>(
	collection: T[],
) => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	collection.forEach((data, i, array) => {
		const prev = array[i - 1];
		if (!prev) return;
		data.prev = prev;
		prev.next = data;
	});
};

export const convertTempoToBpm = (tempo: number) =>
	Math.floor(60000000 / tempo);

export const calcNoteDuration = (fraction: number, denominator: number) =>
	denominator / fraction;

export const convertTimeToSeconds = (time: number, bpm: number) =>
	(60 * time) / bpm;
