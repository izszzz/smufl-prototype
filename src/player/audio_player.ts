import { sf2Parser } from "../parser/sf2_parser";
// TODO: https://web.dev/articles/webaudio-intro?hl=ja

export class AudioPlayer {
	constructor() {
		this.loadSoundfont("/A320U.sf2").then((res) => console.log(res));
	}
	async loadSoundfont(url: string) {
		const buffer = await fetch(url).then((res) => res.arrayBuffer());
		return sf2Parser.parse(new Uint8Array(buffer));
	}
}
