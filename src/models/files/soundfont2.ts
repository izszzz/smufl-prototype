import * as R from "remeda";
import { sf2Parser } from "../../parser/sf2_parser";
// TODO:https://qiita.com/kentaro1530/items/c89fc2d6a8aedb9e3a77#sample%E3%81%AE%E8%A7%A3%E6%9E%90

export class Soundfont2 {
	data: Soundfont2Data;
	constructor(arrayBuffer: ArrayBuffer) {
		this.data = R.mapToObj(
			sf2Parser.parse(new Uint8Array(arrayBuffer)).riff,
			// @ts-ignore
			(data) => [data.id, data],
		) as unknown as Soundfont2Data;
	}
	getPreset() {}
	getPresetHeader(preset: number) {
		const presetHeaderIndex = this.data.phdr.data.findIndex((data) =>
			R.equals(data.preset, preset),
		);
		const presetHeader = this.data.phdr.data.slice(
			presetHeaderIndex,
			presetHeaderIndex + 2,
		);
		return presetHeader;
	}
	getPresetBags(header: ReturnType<typeof this.getPresetHeader>) {
		return this.data.pbag.data.slice(
			header[0].bagIndex,
			header.slice(-1)[0].bagIndex + 2,
		);
	}
	getPresetGenerator(bags: Bag[]) {
		console.log(bags);
		return bags.map((bag) => {
			this.data.pgen.data.findIndex([bag.genIndex]);
		});
	}
	getPresetModulator() {}
	getInstrumentHeader(name: string) {
		const instrumentHeader = this.data.inst.data.find((data) =>
			R.equals(data.name, name),
		);
		if (!R.isDefined(instrumentHeader)) throw new Error("preset not found");
		return instrumentHeader;
	}
}
// TODO: mergeAllした後のオブジェクト形式に変換する。チャンクごとに必須チャンクと任意チャンクがあるのでオプショナルにする
interface Soundfont2Data {
	ifil: RiffChunk<"ifil", string>; // TODO: version表記の調整
	isng: RiffChunk<"isng", string>;
	INAM: RiffChunk<"INAM", string>;
	ICRD: RiffChunk<"ICRD", string>;
	IENG: RiffChunk<"IENG", string>;
	IPRD: RiffChunk<"IPRD", string>;
	ICOP: RiffChunk<"ICOP", string>;
	ICMT: RiffChunk<"ICMT", string>;
	ISFT: RiffChunk<"ISFT", string>;
	smpl: RiffChunk<"smpl", Uint8Array>;
	phdr: RiffChunk<"phdr", Header[]>;
	pbag: RiffChunk<"pbag", Bag[]>;
	pmod: RiffChunk<"pmod", Modulator[]>;
	pgen: RiffChunk<"pgen", Generator[]>;
	inst: RiffChunk<"inst", Instrument[]>;
	ibag: RiffChunk<"ibag", Bag[]>;
	imod: RiffChunk<"imod", Modulator[]>;
	igen: RiffChunk<"igen", Generator[]>;
	shdr: RiffChunk<"shdr", SampleHeader[]>;
}
interface RiffChunk<
	Id extends RiffId | SoundFont2MetadataId | SoundFont2Id,
	Data,
> {
	id: Id;
	length: number;
	data: Data;
}
type RiffId = "RIFF" | "LIST";
type SoundFont2MetadataId =
	| "ifil"
	| "isng"
	| "INAM"
	| "ICRD"
	| "IENG"
	| "IPRD"
	| "ICOP"
	| "ICMT"
	| "ISFT";
type SoundFont2Id =
	| "smpl"
	| "phdr"
	| "pbag"
	| "pmod"
	| "pgen"
	| "inst"
	| "ibag"
	| "imod"
	| "igen"
	| "shdr";

interface Header {
	name: string;
	preset: number;
	bank: number;
	bagIndex: number;
	library: number;
	genre: number;
	morphology: number;
}
interface Bag {
	genIndex: number;
	modIndex: number;
}
interface Modulator {
	srcOper: number;
	destOper: number;
	modAmount: number;
	amtSrcOper: number;
	modTransOper: number;
}

interface Generator {
	genOper: number;
	genAmount: number;
}
interface Instrument {
	name: string;
	bagIndex: number;
}
interface SampleHeader {
	name: string;
	start: number;
	end: number;
	loopStart: number;
	loopEnd: number;
	sampleRate: number;
	originalKey: number;
	correction: string;
	sampleLink: number;
	type: number;
}
