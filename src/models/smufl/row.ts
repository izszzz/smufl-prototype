import * as Core from "../core";
import * as SMUFL from "./";

interface IRow extends Partial<Core.ILink<Row>> {
	tracks: SMUFL.Track[];
	masterBars: SMUFL.MasterBar[];
}
export class Row implements IRow, SMUFL.IPosition {
	x = 0;
	y = 0;
	prev;
	next;
	tracks;
	masterBars;
	// staffs: SMUFL.Staff[][][];
	// TODO:
	//  height: number;
	constructor({ masterBars, tracks, next, prev }: IRow) {
		this.prev = prev;
		this.next = next;
		this.masterBars = masterBars;
		this.tracks = tracks.map((track) => {
			const firstBar = track.bars[0];
			firstBar.metadata = new SMUFL.Metadata(firstBar.core.getMetadata());
			return track;
		});
	}
	// generateStaffs(tracks: SMUFL.Track[]) {
	// 	const generateSpaceStaffs = (
	// 		space: number,
	// 		lineCount: ConstructorParameters<typeof SMUFL.Staff>[1],
	// 	) => R.times(space, () => new SMUFL.Staff(1, lineCount));
	// 	return tracks.flatMap(({ bars }) => [
	// 		bars.map((bar) =>
	// 			R.compact([
	// 				...bar.glyphs.map((glyph) => new SMUFL.Staff(glyph, bar.track)),
	// 				...bar.notes.flatMap((note) => [
	// 					...generateSpaceStaffs(note.spacing.left, bar.track),
	// 					R.isDefined(note.accidental)
	// 						? new SMUFL.Staff(note.accidental, bar.track)
	// 						: null,
	// 					new SMUFL.Staff(note.glyph, bar.track),
	// 					...generateSpaceStaffs(note.spacing.right, bar.track),
	// 				]),
	// 			]),
	// 		),
	// 		[], // this is space row
	// 		[], // this is space row
	// 	]);
	// }
	// generateBarlines(tracks: SMUFL.Track[]) {
	// 	const generateBarlineEnd = (bar: SMUFL.Bar) =>
	// 		new SMUFL.Barline(
	// 			R.isDefined(bar.barline.end)
	// 				? bar.barline.end.glyphName
	// 				: bar.barline.start.glyphName,
	// 		);
	// 	// TODO: Error処理必要か考える
	// 	const firstTrack = R.first(tracks);
	// 	if (R.isNil(firstTrack)) throw new Error();
	// 	const lastBar = R.last(firstTrack.bars);
	// 	if (R.isNil(lastBar)) throw new Error();
	// 	const barlines = firstTrack.bars.map((_, i) => {
	// 		const barline = new SMUFL.Barline("barlineSingle");
	// 		barline.x = firstTrack.bars
	// 			.slice(0, i)
	// 			.reduce((acc, cur) => acc + cur.width, 0);
	// 		return barline;
	// 	});
	// 	const lastBarline = generateBarlineEnd(lastBar);
	// 	lastBarline.x = firstTrack.bars.reduce((acc, cur) => acc + cur.width, 0);
	// 	barlines.push(lastBarline);
	// 	return barlines;
	// }
}
