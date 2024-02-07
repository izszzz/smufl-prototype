import { Parser } from "binary-parser";
class Sf2Importer {
	parse(arrayBuffer: ArrayBuffer) {
		const soundFont2Parser = new Parser().int32("ifil");
		soundFont2Parser.parse(new Uint8Array(arrayBuffer));
	}
}
interface SoundFont2 {
	ifil: number;
}
