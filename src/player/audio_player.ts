import { SampleHeader, Soundfont2 } from "../models/files/soundfont2";
// TODO: https://web.dev/articles/webaudio-intro?hl=ja

export class AudioPlayer {
	sample?: Int16Array;
	sampleHeader?: SampleHeader;
	ctx: AudioContext;
	constructor() {
		console.log("audio");
		this.ctx = new AudioContext();
	}
	async loadSoundfont(url: string) {
		const buffer = await fetch(url).then((res) => res.arrayBuffer());
		return new Soundfont2(new Uint8Array(buffer));
	}
	async init() {
		const sf2 = await this.loadSoundfont("/A320U.sf2");
		console.log(sf2.getPreset(54));
		console.log(
			sf2.getPreset(54).presetBags[0].presetGenerators[0].instrumentBags?.[0]
				.instrumentGenerators[14].sample,
		);
		this.sample =
			sf2.getPreset(
				54,
			).presetBags[0].presetGenerators[0].instrumentBags?.[0].instrumentGenerators[14].sample;
		this.sampleHeader =
			sf2.getPreset(
				54,
			).presetBags[0].presetGenerators[0].instrumentBags?.[0].instrumentGenerators[14].sampleHeader?.data;
	}
	async play() {
		if (!this.sample || !this.sampleHeader) return;
		const float32 = new Float32Array(this.sample.length);
		for (let i = 0; i < this.sample.length; i++) {
			float32[i] = this.sample[i] / 32768; // convert to [-1, 1]
		}
		const buffer = this.ctx.createBuffer(
			1,
			float32.length,
			this.sampleHeader.sampleRate,
		);
		buffer.getChannelData(0).set(float32);
		const source = this.ctx.createBufferSource();
		source.buffer = buffer;
		// set loop!
		if (this.sampleHeader.loopEnd > this.sampleHeader.loopStart) {
			const loopStart = this.sampleHeader.loopStart - this.sampleHeader.start;
			source.loopStart = loopStart / this.sampleHeader.sampleRate;
			source.loopEnd =
				(this.sampleHeader.loopEnd - this.sampleHeader.start) /
				this.sampleHeader.sampleRate;
			source.loop = true;
		}
		source.connect(this.ctx.destination);
		source.start();
	}
}
