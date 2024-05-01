// TODO: 命名考える
interface ITime {
	start: number;
	duration: number;
	end: number;
}
export class Time implements ITime {
	start;
	duration = 0;
	end = 0;
	constructor(time: { start: number; duration?: number; end: number });
	constructor(time: { start: number; duration: number; end?: number });
	constructor(time: { start: number; duration?: number; end?: number }) {
		this.start = time.start;
		if (time.end) {
			this.end = time.end;
			this.duration = time.end - time.start;
		}
		if (time.duration) {
			this.end = time.start + time.duration;
			this.duration = time.duration;
		}
	}
}
