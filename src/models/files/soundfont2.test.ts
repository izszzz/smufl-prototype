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
	test("getPresetHeader", () => {
		expect(soundfont2.getPresetHeader(54)).toBeDefined();
	});
	test("getPresetBag", () => {
		expect(
			soundfont2.getPresetBags(soundfont2.getPresetHeader(54)),
		).toBeDefined();
	});
	test("getPresetGenerator", () => {
		expect(
			soundfont2.getPresetGenerator(
				soundfont2.getPresetBags(soundfont2.getPresetHeader(54)),
			),
		).toBeDefined();
	});
});
