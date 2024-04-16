import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

interface IScore {
	type: "Pagination" | "VerticalScroll" | "HorizontalScroll";
	clientWidth: number;
	tracks: SMUFL.Track[];
	masterBars: SMUFL.MasterBar[];
	rows: SMUFL.Row[];
}
export class Score implements IScore {
	type;
	clientWidth;
	tracks;
	masterBars;
	rows;
	constructor(
		{ tracks }: Core.Score,
		clientWidth: number,
		type: IScore["type"],
	) {
		this.type = type;
		this.clientWidth = clientWidth;
		this.tracks = tracks.map((track) => new SMUFL.Track(track));
		this.masterBars = R.pipe(
			this.tracks,
			R.flatMap((track) => track.bars),
			R.groupBy((bar) => bar.core.id),
			R.toPairs,
			R.map(
				([id, bars]) =>
					new SMUFL.MasterBar({
						id: Number(id),
						bars,
					}),
			),
		);
		this.rows = this.layout(this.masterBars);
		Core.setPrevAndNext(this.masterBars);
	}
	layout(masterBars: SMUFL.MasterBar[]): SMUFL.Row[] {
		// TODO: clientWidthによってスペースを変更する処理
		// TODO: timeの数値によって配置を設定する

		const ajustSpacing = (tracks: SMUFL.Track[]): SMUFL.Track[] => {
			const verticalNotesCollection = tracks[0].bars
				.map((_, barIndex) => tracks.map((track) => track.bars[barIndex]))
				.map((verticalBars) =>
					verticalBars[0].notes.map((_, noteIndex) =>
						verticalBars.map((verticalBar) => verticalBar.notes[noteIndex]),
					),
				);
			// biome-ignore lint/complexity/noForEach: <explanation>
			// verticalNotesCollection.forEach((verticalBars) => {
			// 	// biome-ignore lint/complexity/noForEach: <explanation>
			// 	verticalBars.forEach((verticalNotes) => {
			// 		const maxWidthVerticalNote = R.pipe(
			// 			verticalNotes,
			// 			R.sortBy((note) => note.glyph.staffWidth),
			// 			R.last(),
			// 		);
			// 		if (maxWidthVerticalNote)
			// 			// biome-ignore lint/complexity/noForEach: <explanation>
			// 			verticalNotes.forEach((note) => {
			// 				if (
			// 					note.glyph.staffWidth !== maxWidthVerticalNote.glyph.staffWidth
			// 				)
			// 					note.spacing.right =
			// 						maxWidthVerticalNote.glyph.staffWidth - note.glyph.staffWidth;
			// 			});
			// 		if (verticalNotes.some((note) => R.isDefined(note.accidental)))
			// 			// biome-ignore lint/complexity/noForEach: <explanation>
			// 			verticalNotes.forEach((note) => {
			// 				if (R.isNil(note.accidental)) note.spacing.left = 1;
			// 			});
			// 	});
			// });

			return tracks;
		};
		// const layoutNewLine = (masterBars: SMUFL.MasterBar[]): SMUFL.Row[] => {
		// 	const generateRow = (
		// 		start: number,
		// 		end?: number,
		// 		prev?: SMUFL.Row["prev"],
		// 	) => new SMUFL.Row({ masterBars: masterBars.slice(start, end), prev });
		// 	const firstTrack = R.first(tracks);
		// 	if (R.isNil(firstTrack)) throw new Error();
		// 	return firstTrack.bars.reduce<{
		// 		rows: SMUFL.Row[];
		// 		width: number;
		// 		start: number;
		// 		prev?: SMUFL.Row | undefined;
		// 	}>(
		// 		(acc, cur, i) => {
		// 			acc.width += cur.width;
		// 			if (acc.width > this.clientWidth) {
		// 				const row = generateRow(acc.start, i, acc.prev);
		// 				acc.width = cur.width;
		// 				acc.rows.push(row);
		// 				acc.prev = row;
		// 				acc.start = i;
		// 			}
		// 			if (
		// 				i === firstTrack.bars.length - 1 &&
		// 				acc.width < this.clientWidth
		// 			) {
		// 				const row = generateRow(acc.start, undefined, acc.prev);
		// 				acc.rows.push(row);
		// 				acc.prev = row;
		// 			}
		// 			return acc;
		// 		},
		// 		{ rows: [], width: 0, start: 0, prev: undefined },
		// 	).rows;
		// };
		// const spacingTracks = ajustSpacing(tracks);
		if (this.type === "HorizontalScroll")
			return [new SMUFL.Row({ masterBars, tracks: this.tracks })];
		// if (this.type === "VerticalScroll") return layoutNewLine(this.masterBars);
		if (this.type === "VerticalScroll") return [];
		if (this.type === "Pagination") return [];
		return [];
	}
}
