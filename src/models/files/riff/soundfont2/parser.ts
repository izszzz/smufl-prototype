import { Parser as BinaryParser } from "binary-parser";

export const headerParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser()
      .endianness("little")
      .string("name", { length: 20, stripNull: true })
      .uint16("preset")
      .uint16("bank")
      .uint16("bagIndex")
      .uint32("library")
      .uint32("genre")
      .uint32("morphology"),
    lengthInBytes,
  });
export const sampleHeaderParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser()
      .endianness("little")
      .string("name", { length: 20, stripNull: true })
      .uint32("start")
      .uint32("end")
      .uint32("loopStart")
      .uint32("loopEnd")
      .uint32("sampleRate")
      .uint8("originalKey")
      .uint8("correction")
      .uint16("sampleLink")
      .uint16("type"),
    lengthInBytes,
  });
export const bagParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser().uint16le("genIndex").uint16le("modIndex"),
    lengthInBytes,
  });
export const modulatorParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser()
      .endianness("little")
      .uint16("srcOper")
      .uint16("destOper")
      .uint16("modAmount")
      .uint16("amtSrcOper")
      .uint16("modTransOper"),
    lengthInBytes,
  });
export const generatorParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser().uint16le("genOper").uint16le("genAmount"),
    lengthInBytes,
  });
export const instrumentParser = (lengthInBytes: number) =>
  new BinaryParser().array("data", {
    type: new BinaryParser()
      .string("name", { length: 20, stripNull: true })
      .uint16le("bagIndex"),
    lengthInBytes,
  });
