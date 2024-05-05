import * as Core from "./";
interface INote extends Core.ILink<Note[]> {
	fraction: number;
	pitch: number;
	track: Core.Track;
	time: Core.Time;
}
export class Note implements INote {
	fraction;
	pitch;
	track;
	time;
	next?: Note[];
	prev?: Note[];
	constructor({
		fraction,
		pitch,
		track,
		time,
	}: Omit<INote, "time"> & {
		time: Core.Time | ConstructorParameters<typeof Core.Time>[0];
	}) {
		this.fraction = fraction;
		this.pitch = pitch;
		this.track = track;
		this.time = time instanceof Core.Time ? time : new Core.Time(time);
	}

	static build(
		params: Omit<INote, "track" | "time"> & {
			time: Core.Time | ConstructorParameters<typeof Core.Time>[0];
		},
	) {
		return params;
	}
}
