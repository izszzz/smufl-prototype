import * as Core from "./";
interface NoteConstructorArgs {
	fraction: number;
	pitch: number;
	prev?: Note;
	next?: Note;
	bar: Core.Bar;
}
export class Note implements NoteConstructorArgs {
	fraction;
	pitch;
	prev;
	next;
	bar;
	constructor({ fraction, pitch, prev, next, bar }: NoteConstructorArgs) {
		this.fraction = fraction;
		this.pitch = pitch;
		this.next = next;
		this.prev = prev;
		this.bar = bar;
	}
	get time(): number {
		// TODO: 4をtimesigからとるようにする
		return 60 / (this.fraction / 4) / this.bar.metadata.bpm;
	}
	get startTime(): number {
		return this.prev ? this.prev.endTime : 0;
	}
	get endTime(): number {
		return this.startTime + this.time;
	}
}
