import * as R from "remeda";
import * as Core from "../models/core";
import { Soundfont2 } from "../models/files/soundfont2";
import { Exporter } from "./exporter";

export class SourceExporter implements Exporter {
	score;
	sf2;
	ctx;
	constructor(score: Core.Score, sf2: Soundfont2, ctx: AudioContext) {
		this.score = score;
		this.sf2 = sf2;
		this.ctx = ctx;
	}
	export() {
		return this.score.tracks.map((track) => {
			const preset = this.sf2.getPreset(track.preset);
			const sounds = R.pipe(
				preset.presetBags,
				R.map((pbag) =>
					pbag.presetGenerators.map((pgen) =>
						pgen.instrumentBags?.map((ibag) =>
							ibag.instrumentGenerators.map((igen) => {
								if (!igen.sample || !igen.sampleHeader) return null;
								const float32 = this.convertInt16ArrayToFloat32Array(
									igen.sample,
								);
								const buffer = this.ctx.createBuffer(
									1,
									float32.length,
									igen.sampleHeader.data.sampleRate,
								);
								buffer.getChannelData(0).set(float32);
								return { buffer, sampleHeader: igen.sampleHeader.data };
							}),
						),
					),
				),
				R.flattenDeep(),
				R.compact,
			);
			return sounds.map((sound) => {
				const source = this.ctx.createBufferSource();
				source.buffer = sound.buffer;
				if (sound.sampleHeader.loopEnd > sound.sampleHeader.loopStart) {
					const loopStart =
						sound.sampleHeader.loopStart - sound.sampleHeader.start;
					source.loopStart = loopStart / sound.sampleHeader.sampleRate;
					source.loopEnd =
						(sound.sampleHeader.loopEnd - sound.sampleHeader.start) /
						sound.sampleHeader.sampleRate;
					source.loop = true;
				}
				const baseDetune =
					sound.sampleHeader.originalKey -
					sound.sampleHeader.correction / 100.0;
				// TODO: 再生するごとにsetValueAtTimeを設定するのがよいかも
				const notes = R.pipe(
					track.bars,
					R.map((bar) => bar.notes),
					R.flatten(),
				);
				for (const note of notes) {
					source.playbackRate.setValueAtTime(
						1.0 * 2 ** ((100.0 * (note.pitch - baseDetune)) / 1200.0),
						this.ctx.currentTime + note.startTime,
					);
				}
				return source;
			});
		});
	}
	private convertInt16ArrayToFloat32Array(int16array: Int16Array) {
		const float32 = new Float32Array(int16array.length);
		for (let i = 0; i < int16array.length; i++)
			float32[i] = int16array[i] / 32768;
		return float32;
	}
}
