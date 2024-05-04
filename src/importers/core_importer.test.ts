import * as Core from "../models/core";
describe("Prev & Next", () => {
	test("Single Notes", () => {
		const score = new Core.Score({
			tracks: [
				{
					notes: [
						{ pitch: 60, fraction: 4, time: { start: 0, duration: 1 } },
						{ pitch: 60, fraction: 4, time: { start: 1, duration: 1 } },
					],
				},
			],
		});
		expect(score.tracks[0].notes[1]).toEqual(score.tracks[0].notes[0].next);
	});
});
