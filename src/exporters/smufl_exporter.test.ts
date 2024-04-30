import * as Core from "../models/core";
import { SMUFLExporter } from "./smufl_exporter";
describe("Note", () => {
	test("export quarter middle C Core.Note", () => {
		const smufl = new SMUFLExporter(
			new Core.Score({
				tracks: [
					{
						notes: [{ pitch: 60, fraction: 4, start: 0, duration: 1, end: 1 }],
					},
				],
			}),
		).export();
		expect(smufl.tracks[0].bars[0].notes[0].glyph.glyphName).toEqual(
			"noteQuarterUp",
		);
	});
});
