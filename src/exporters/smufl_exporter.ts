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
		for (const [i, track] of score.tracks.entries()) {
			track.y = i * 12;
			for (const bar of track.bars) bar.y = track.y;
		}
		for (const row of score.rows) {
			for (const track of row.tracks) {
				for (const bar of track.bars) {
					if (bar.metadata) {
						bar.metadata.glyphs.glyphs.reduce<SMUFL.Glyph[] | null>(
							(acc, cur) => {
								if (acc) {
									const prevGlyph = R.firstBy(acc, [R.prop("width"), "desc"]);
									for (const glyph of cur)
										glyph.x = SMUFL.safeSum(prevGlyph?.x, prevGlyph?.width);
								}
								return cur;
							},
							null,
						);
					}
					for (const note of bar.notes) {
						note.glyphs.glyphs.reduce<SMUFL.Glyph[] | null>((prev, cur) => {
							if (!prev) return cur;
							const prevGlyph = R.firstBy(prev, [R.prop("width"), "desc"]);
							for (const glyph of cur)
								glyph.x = SMUFL.safeSum(prevGlyph?.x, prevGlyph?.width);
							return cur;
						}, null);
					}
				}
			}
		}
		for (const masterBar of score.masterBars) {
			masterBar.x = SMUFL.safeSum(masterBar.prev?.x, masterBar.prev?.width);
			for (const bar of masterBar.bars) {
				bar.x = masterBar.x;
			}
			R.pipe(
				masterBar.groupedNotes,
				R.entries(),
				R.sortBy([([i]) => i, "asc"]),
				R.reduce(
					(acc, [, cur]) => {
						if (cur.some((note) => note.accessory.left.glyphs.length > 0)) {
							const maxWidth = R.firstBy(cur, [
								(n) => n.accessory.left.width,
								"desc",
							]).accessory.left.width;
							for (const note of cur.filter(
								(n) => n.accessory.left.width < maxWidth,
							)) {
								note.spacing.left = maxWidth - note.accessory.left.width;
								for (const glyph of note.glyphs.glyphs)
									for (const g of glyph) g.x = note.spacing.left;
							}
						}
						if (acc) for (const note of cur) note.x += acc.x + acc.width;
						return R.firstBy(cur, [R.prop("width"), "desc"]);
					},
					null as SMUFL.Note | null,
				),
			);
		}
		return score;
	}
}
