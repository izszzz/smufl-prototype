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
		.endianness("little")
		.string("name", {
			length: 20,
			encoding: "ascii",
		})
		.uint16("preset")
		.uint16("bank")
		.uint16("bagIndex")
		.uint32("library")
		.uint32("genre")
		.uint32("morphology"),
	lengthInBytes: "length",
});
const sampleHeaderParser = new Parser().array("data", {
	type: new Parser()
		.endianness("little")
		.string("name", { length: 20 })
		.uint32("start")
		.uint32("end")
		.uint32("loopStart")
		.uint32("loopEnd")
		.uint32("sampleRate")
		.uint8("originalKey")
		.uint8("correction")
		.uint16("sampleLink")
		.uint16("type"),
	lengthInBytes: "length",
});
const bagParser = new Parser().array("data", {
	type: new Parser().uint16le("genIndex").uint16le("modIndex"),
	lengthInBytes: "length",
});
const modulatorParser = new Parser().array("data", {
	type: new Parser()
		.endianess("little")
		.uint16("srcOper")
		.uint16("destOper")
		.uint16("modAmount")
		.uint16("amtSrcOper")
		.uint16("modTransOper"),
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
