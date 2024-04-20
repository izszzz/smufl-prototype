import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";
interface IMasterBar extends Core.ILink<MasterBar> {
	id: number;
	bars: SMUFL.Bar[];
}

export class MasterBar implements IMasterBar, SMUFL.IPosition, SMUFL.IBox {
	id;
	bars;
	x = 0;
	y = 0;
	height = 0;
	groupedNotes;
	prev?;
	next?;
	get width() {
		return (
			R.pipe(
				this.groupedNotes,
				R.entries(),
				R.map(([, notes]) => R.firstBy(notes, [R.prop("width"), "desc"]).width),
				R.reduce(R.add, 0),
			) +
			(R.pipe(
				this.bars,
				R.map(R.prop("metadata")),
				R.filter(R.isTruthy),
				R.firstBy([(m) => m.width, "desc"]),
			)?.width ?? 0)
		);
	}
	constructor({ id, bars, prev, next }: IMasterBar) {
		this.id = id;
		this.bars = bars;
		this.prev = prev;
		this.next = next;
		this.groupedNotes = R.groupBy(
			bars.flatMap((bar) => bar.notes),
			(n) => n.core.start,
		);
	}
}
