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
	width = 10;
	groupedNotes;
	prev?;
	next?;
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
