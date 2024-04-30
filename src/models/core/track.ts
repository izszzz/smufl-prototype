import * as R from "remeda";
import * as Core from "./";

interface ITrack extends IConstructor {
	bars: Core.Bar[];
	getMetadata: () => Core.Metadata;
}
interface IConstructor {
	id: number;
	notes: (Core.Note | ReturnType<typeof Core.Note.build>)[];
	score: Core.Score;
	name?: string;
	preset?: number;
	metadata?: Core.Metadata;
}

export class Track implements ITrack, Core.ITime {
	id;
	notes;
	bars;
	metadata;
	name;
	score;
	preset;
	start;
	duration;
	end;
	constructor({ id, name, notes, score, metadata, preset }: IConstructor) {
		this.id = id;
		this.score = score;
		this.name = name;
		this.preset = preset ?? 54;
		this.start = R.first(notes)?.start ?? 0;
		this.end = R.last(notes)?.end ?? 0;
		this.duration = R.last(notes)?.duration ?? 0;
		this.metadata = metadata;
		this.notes = notes.map((note) =>
			note instanceof Core.Note
				? note
				: new Core.Note({ ...note, track: this }),
		);
		R.reduce(
			this.notes,
			(acc, cur) => {
				return cur;
			},
			null as Core.Note | null,
		);
		this.bars = this.notes.reduce<{ bars: Core.Bar[]; notes: Core.Note[] }>(
			(acc, cur, i) => {
				acc.notes.push(cur);
				if (
					notes.length - 1 === i ||
					acc.notes.reduce((acc, cur) => acc + cur.duration, 0) ===
						this.getMetadata().timeSignature.numerator
				) {
					acc.bars.push(
						new Core.Bar({
							id: acc.bars.length,
							notes: acc.notes,
							track: this,
						}),
					);
					acc.notes = [];
				}
				return acc;
			},
			{ bars: [], notes: [] },
		).bars;
		Core.setPrevAndNext(this.bars);
	}
	getMetadata() {
		return this.metadata ?? this.score.metadata;
	}
}
