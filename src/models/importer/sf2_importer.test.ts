import fs from "fs";
import { Sf2Importer } from "./sf2_importer";
// TODO: Parserに名前変えていいかも
const toArrayBuffer = (buffer: Buffer) =>
	buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
const path = "src/A320U.sf2";
const sf2Importer = new Sf2Importer();
test("t", () => {
	console.log(sf2Importer.parse(toArrayBuffer(fs.readFileSync(path))));
});
