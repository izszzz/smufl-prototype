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
									? R.firstBy(prev, [(g) => g.width, "desc"])
									: prev;
								for (const glyph of R.isArray(cur) ? cur : [cur]) {
									glyph.x = SMUFL.safeSum(prevGlyph?.x, prevGlyph?.width);
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
									? R.firstBy(prev, [(g) => g.width, "desc"])
									: prev;
								for (const glyph of R.isArray(cur) ? cur : [cur]) {
									glyph.x = SMUFL.safeSum(prevGlyph?.x, prevGlyph?.width);
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
			masterBar.x = SMUFL.safeSum(masterBar.prev?.x, masterBar.prev?.width);
			for (const bar of masterBar.bars) {
				bar.x = masterBar.x;
			}
			console.log(masterBar.groupedNotes);
		}
		return score;
	}
}
