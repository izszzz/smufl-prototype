import { Parser } from "binary-parser";
export class Sf2Importer {
	parse(arrayBuffer: ArrayBuffer) {
		const fourString = ["RIFF", "LIST"];
		const string = [
			"ifil",
			"isng",
			"INAM",
			"ICRD",
			"IENG",
			"IPRD",
			"ICOP",
			"ICMT",
			"ISFT",
		];
		const riffChunkParser = new Parser()
			.string("identifier", { length: 4 })
			.int32le("length")
			.choice({
				tag: function () {
					// @ts-ignore
					console.log(this.identifier, this.length);
					return (
						[fourString, string].findIndex((identifiers) =>
							//@ts-ignore
							identifiers.includes(this.identifier),
						) + 1 || -1
					);
				},
				choices: {
					1: new Parser().string("data", { length: 4, encoding: "ascii" }),
					2: new Parser().string("data", {
						length: "length",
						encoding: "ascii",
					}),
				},
				defaultChoice: new Parser().buffer("data", { length: "length" }),
			});
		const soundFont2Parser = new Parser().array("riff", {
			type: riffChunkParser,
			readUntil: "eof",
		});
		return soundFont2Parser.parse(new Uint8Array(arrayBuffer));
	}
}
interface SoundFont2 {
	ifil: number;
}
