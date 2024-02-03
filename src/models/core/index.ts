import * as R from "remeda";
export * from "./bar";
export * from "./note";
export * from "./score";
export * from "./track";
export * from "./metadata";

export const setPrevAndNext = <T extends { prev?: T; next?: T }>(
	collection: T[],
) => {
	for (const data of collection) {
		const prevData = R.last(collection);
		if (!prevData) return;
		data.prev = prevData;
		prevData.next = data;
	}
};
