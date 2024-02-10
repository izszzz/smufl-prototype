import fs from "fs";
import { Soundfont2 } from "./soundfont2";

const toArrayBuffer = (buffer: Buffer) =>
	buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
describe("soundfont2", () => {
	let soundfont2: Soundfont2;
	beforeAll(async () => {
		const buffer = toArrayBuffer(fs.readFileSync("public/A320U.sf2"));
		soundfont2 = new Soundfont2(buffer);
	});
	test("getPreset", () => {
		console.log(
			soundfont2
				.getPreset(54)
				.presetBags[0].presetGenerators[0].instrumentBags?.[0].instrumentGenerators.slice(
					-1,
				)[0].sampleHeader,
		);
	});
});
