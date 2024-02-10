import { Parser } from "binary-parser";

// TODO: 定数　json　移行
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
const headerParser = new Parser().array("data", {
	type: new Parser()
		.string("name", {
			length: 20,
			encoding: "ascii",
		})
		.uint16le("preset")
		.uint16le("bank")
		.uint16le("bagIndex")
		.uint32le("library")
		.uint32le("genre")
		.uint32le("morphology"),
	lengthInBytes: "length",
});
const sampleHeaderParser = new Parser().array("data", {
	type: new Parser()
		.string("name", { length: 20 })
		.uint32le("start")
		.uint32le("end")
		.uint32le("loopStart")
		.uint32le("loopEnd")
		.uint32le("sampleRate")
		.uint8("originalKey")
		.string("correction", { length: 1 })
		.uint16le("sampleLink")
		.uint16le("type"),
	lengthInBytes: "length",
});
const bagParser = new Parser().array("data", {
	type: new Parser().uint16le("genIndex").uint16le("modIndex"),
	lengthInBytes: "length",
});
const modulatorParser = new Parser().array("data", {
	type: new Parser()
		.uint16le("srcOper")
		.uint16le("destOper")
		.uint16le("modAmount")
		.uint16le("amtSrcOper")
		.uint16le("modTransOper"),
	lengthInBytes: "length",
});
const generatorParser = new Parser().array("data", {
	type: new Parser().uint16le("genOper").uint16le("genAmount"),
	lengthInBytes: "length",
});
const instrumentParser = new Parser().array("data", {
	type: new Parser().string("name", { length: 20 }).uint16le("bagIndex"),
	lengthInBytes: "length",
});
const riffParser = new Parser()
	.string("id", { length: 4 })
	.int32le("length")
	.choice({
		tag: function () {
			return (
				[
					fourString,
					string,
					["phdr"],
					["pbag", "ibag"],
					["pmod", "imod"],
					["pgen", "igen"],
					["inst"],
					["shdr"],
				].findIndex((ids) =>
					//@ts-ignore
					ids.includes(this.id),
				) + 1 || -1
			);
		},
		choices: {
			1: new Parser().string("data", { length: 4, encoding: "ascii" }),
			2: new Parser().string("data", {
				length: "length",
				encoding: "ascii",
			}),
			3: headerParser,
			4: bagParser,
			5: modulatorParser,
			6: generatorParser,
			7: instrumentParser,
			8: sampleHeaderParser,
		},
		defaultChoice: new Parser().buffer("data", { length: "length" }),
	});
export const sf2Parser = new Parser().useContextVars().array("riff", {
	type: riffParser,
	readUntil: "eof",
});
