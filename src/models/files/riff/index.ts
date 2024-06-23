import { Parser } from "./parser";

interface Chunk {
  id: string;
  length: number;
  data: Uint8Array;
}

export class Riff {
  data;
  constructor(arrayBuffer: ArrayBuffer) {
    this.data = Parser.parse(new Uint8Array(arrayBuffer)) as {
      chunks: Chunk[];
    };
  }
  getChunk(id: string) {
    const chunk = this.data.chunks.find((chunk) => chunk.id === id);
    if (!chunk) throw new Error();
    return chunk;
  }
  static Parser = Parser;
}
