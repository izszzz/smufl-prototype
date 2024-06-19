import * as R from "remeda";
import { Parser } from "./parser";
import { RiffChunk } from "../riff";
import Metadata from "./metadata.json";
// TODO:https://qiita.com/kentaro1530/items/c89fc2d6a8aedb9e3a77#sample%E3%81%AE%E8%A7%A3%E6%9E%90

export class Soundfont2 {
  data: Soundfont2Data;
  constructor(arrayBuffer: ArrayBuffer) {
    this.data = R.mapToObj(
      Soundfont2.Parser.parse(new Uint8Array(arrayBuffer)).riff,
      // @ts-ignore
      (data) => [data.id, data]
    ) as unknown as Soundfont2Data;
  }
  static Parser = Parser;
  getPreset(preset: number) {
    const { data, index } = this.getPresetHeader(preset);
    const presetBags = this.getPresetBags(data, index);
    return {
      presetHeader: data,
      presetBags: presetBags.map(({ data, index }) => ({
        presetBag: data,
        presetGenerators: this.getPresetGenerators(data, index).map(
          (presetGenerator) => {
            if (presetGenerator.genOper !== 41) return { presetGenerator };
            const { data, index } = this.getInstrumentHeader(presetGenerator);
            const instrumentBags = this.getInstrumentBags(data, index);
            return {
              presetGenerator,
              instrumentHeader: data,
              instrumentBags: instrumentBags.map(({ data, index }) => ({
                instrumentBag: data,
                instrumentGenerators: this.getInstrumentGenerators(
                  data,
                  index
                ).map((instrumentGenerator) => {
                  if (instrumentGenerator.genOper !== 53)
                    return { instrumentGenerator };
                  const sampleHeader =
                    this.getSampleHeader(instrumentGenerator);
                  return {
                    instrumentGenerator,
                    sampleHeader,
                    sample: this.getSample(sampleHeader),
                  };
                }),
              })),
            };
          }
        ),
      })),
    };
  }

  getSample(sampleHeader: ReturnType<typeof this.getSampleHeader>) {
    return new Int16Array(
      new Uint8Array(
        this.data.smpl.data.subarray(
          2 * sampleHeader.data.start,
          2 * sampleHeader.data.end
        )
      ).buffer
    );
  }

  getPresetBags = (...params: [Header, number]) =>
    this.getBags("preset", ...params);
  getInstrumentBags = (...params: [Header, number]) =>
    this.getBags("instrument", ...params);
  getBags(type: "instrument" | "preset", header: Header, headerIndex: number) {
    const nextHeader =
      this.data[type === "preset" ? "phdr" : "inst"].data[headerIndex + 1];
    return this.data[type === "preset" ? "pbag" : "ibag"].data
      .slice(header.bagIndex, nextHeader.bagIndex)
      .map((bag, i) => ({ data: bag, index: header.bagIndex + i }));
  }

  getPresetGenerators = (...params: [Bag, number]) =>
    this.getGenerators("preset", ...params);
  getInstrumentGenerators = (...params: [Bag, number]) =>
    this.getGenerators("instrument", ...params);
  getGenerators(type: "instrument" | "preset", bag: Bag, bagIndex: number) {
    const nextBag =
      this.data[type === "preset" ? "pbag" : "ibag"].data[bagIndex + 1];
    return this.data[type === "preset" ? "pgen" : "igen"].data.slice(
      bag.genIndex,
      nextBag.genIndex
    );
  }

  getPresetHeader(preset: number) {
    const index = this.data.phdr.data.findIndex(
      (data) => data.preset === preset
    );
    return { data: this.data.phdr.data[index], index };
  }
  getInstrumentHeader = (generator: Generator) =>
    this.getHeader("instrument", generator);
  getSampleHeader = (generator: Generator) =>
    this.getHeader("sample", generator);
  getHeader<Type extends "instrument" | "sample">(
    type: Type,
    generator: Generator
  ): {
    data: Soundfont2Data[Type extends "sample" ? "shdr" : "inst"]["data"][0];
    index: number;
  } {
    return {
      data: this.data[type === "sample" ? "shdr" : "inst"].data[
        generator.genAmount
      ],
      index: generator.genAmount,
    };
  }

  getPresetHeaders() {
    return this.data.shdr;
  }
}
type Soundfont2Data = MetadataChunks & DataChunks;
type MetadataChunks = {
  [P in Metadata["metadataId"][number]]: RiffChunk<P, string>;
};
type DataChunks = {
  smpl: RiffChunk<"smpl", Buffer>;
  phdr: RiffChunk<"phdr", PresetHeader[]>;
  pbag: RiffChunk<"pbag", Bag[]>;
  pmod: RiffChunk<"pmod", Modulator[]>;
  pgen: RiffChunk<"pgen", Generator[]>;
  inst: RiffChunk<"inst", InstrumentHeader[]>;
  ibag: RiffChunk<"ibag", Bag[]>;
  imod: RiffChunk<"imod", Modulator[]>;
  igen: RiffChunk<"igen", Generator[]>;
  shdr: RiffChunk<"shdr", SampleHeader[]>;
};

interface Header {
  name: string;
  bagIndex: number;
}
interface PresetHeader extends Header {
  preset: number;
  bank: number;
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
type InstrumentHeader = Header;
export interface SampleHeader {
  name: string;
  start: number;
  end: number;
  loopStart: number;
  loopEnd: number;
  sampleRate: number;
  originalKey: number;
  correction: number;
  sampleLink: number;
  type: number;
}
