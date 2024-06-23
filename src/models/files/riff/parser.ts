import Metadata from "./metadata.json";
import { Parser as BinaryParser } from "binary-parser";

const riffParser = new BinaryParser()
  .string("id", { length: 4 })
  .int32le("length")
  .choice({
    tag: function () {
      return (
        [Metadata["id"]].findIndex((ids) => ids.includes(this.id)) + 1 || -1
      );
    },
    choices: {
      1: new BinaryParser().string("data", { length: 4, encoding: "ascii" }),
      2: new BinaryParser().string("data", {
        length: "length",
        encoding: "ascii",
      }),
    },
    defaultChoice: new BinaryParser().buffer("data", { length: "length" }),
  });

export const Parser = new BinaryParser().array("chunks", {
  type: riffParser,
  readUntil: "eof",
});
