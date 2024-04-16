import * as R from "remeda";
import * as Core from "../models/core";
import * as SMUFL from "../models/smufl";
import { Exporter } from "./exporter";

export class SMUFLExporter implements Exporter<SMUFL.Score> {
	score;
	constructor(score: Core.Score) {
		this.score = score;
	}
	export(clientWidth?: number) {
		const score = new SMUFL.Score(
			this.score,
			clientWidth ?? 0,
			"HorizontalScroll",
		);
		for (const row of score.rows) {
			for (const track of row.tracks) {
				for (const bar of track.bars) {
					if (bar.metadata) {
						bar.metadata.glyphs.reduce<SMUFL.Glyph | SMUFL.Glyph[] | null>(
							(prev, cur) => {
								const prevGlyph = R.isArray(prev)
									? R.maxBy(prev, (g) => g.width)
									: prev;
								for (const glyph of R.isArray(cur) ? cur : [cur]) {
									glyph.x = (prevGlyph?.x ?? 0) + (prevGlyph?.width ?? 0);
								}
								return cur;
							},
							null,
						);
					}
					for (const note of bar.notes) {
						if (bar.metadata) note.x = bar.metadata.width;
						note.glyphs.reduce<SMUFL.Glyph | SMUFL.Glyph[] | null>(
							(prev, cur) => {
								const prevGlyph = R.isArray(prev)
									? R.maxBy(prev, (g) => g.width)
									: prev;
								for (const glyph of R.isArray(cur) ? cur : [cur]) {
									glyph.x = (prevGlyph?.x ?? 0) + (prevGlyph?.width ?? 0);
								}
								return cur;
							},
							null,
						);
					}
				}
			}
		}
		for (const masterBar of score.masterBars) {
			masterBar.x = (masterBar.prev?.x ?? 0) + (masterBar.prev?.width ?? 0);
			for (const bar of masterBar.bars) {
				bar.x = masterBar.x;
			}
			const notes = masterBar.bars.flatMap((bar) => bar.notes);
		}
		return score;
	}
}
