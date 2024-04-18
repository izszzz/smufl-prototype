import * as Core from "./";
interface INote extends Core.ITime, Core.ILink<Note> {
	fraction: number;
	pitch: number;
	track: Core.Track;
}
export class Note implements INote, Core.ILink<Note> {
	fraction;
	pitch;
	track;
	start;
	duration;
	end;
	next?: Note;
	prev?: Note;
	constructor({
		fraction,
		pitch,
		track,
		start,
		duration,
		end,
	}: INote & Core.ITime) {
		this.fraction = fraction;
		this.pitch = pitch;
		this.track = track;
		this.start = start;
		this.duration = duration;
		this.end = end;
	}

	static build(params: Omit<INote, "track">) {
		return params;
	}
}
