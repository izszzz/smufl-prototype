import * as Riff from "../riff";
import { Parser as BinaryParser } from "binary-parser";
import Metadata from "./metadata.json";

const headerParser = new BinaryParser().array("data", {
  type: new BinaryParser()
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
const sampleHeaderParser = new BinaryParser().array("data", {
  type: new BinaryParser()
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
const bagParser = new BinaryParser().array("data", {
  type: new BinaryParser().uint16le("genIndex").uint16le("modIndex"),
  lengthInBytes: "length",
});
const modulatorParser = new BinaryParser().array("data", {
  type: new BinaryParser()
    .endianness("little")
    .uint16("srcOper")
    .uint16("destOper")
    .uint16("modAmount")
    .uint16("amtSrcOper")
    .uint16("modTransOper"),
  lengthInBytes: "length",
});
const generatorParser = new BinaryParser().array("data", {
  type: new BinaryParser().uint16le("genOper").uint16le("genAmount"),
  lengthInBytes: "length",
});
const instrumentParser = new BinaryParser().array("data", {
  type: new BinaryParser().string("name", { length: 20 }).uint16le("bagIndex"),
  lengthInBytes: "length",
});
const riffParser = new BinaryParser()
  .string("id", { length: 4 })
  .int32le("length")
  .choice({
    tag: function () {
      return (
        [
          Riff.Metadata["id"],
          Metadata["metadataId"],
          ["phdr"],
          ["pbag", "ibag"],
          ["pmod", "imod"],
          ["pgen", "igen"],
          ["inst"],
          ["shdr"],
        ].findIndex((ids) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          ids.includes(this.id)
        ) + 1 || -1
      );
    },
    choices: {
      1: new BinaryParser().string("data", { length: 4, encoding: "ascii" }),
      2: new BinaryParser().string("data", {
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
    defaultChoice: new BinaryParser().buffer("data", { length: "length" }),
  });
export const Parser = new BinaryParser().useContextVars().array("riff", {
  type: riffParser,
  readUntil: "eof",
});
