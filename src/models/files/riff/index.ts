import Metadata from "./metadata.json";

export interface Chunk {
  id: string;
  length: number;
  data: Uint8Array;
}

export default class Riff {
  constructor(public chunks: Chunk[]) {}
  getChunk(id: string) {
    return this.chunks.find((chunk) => chunk.id === id);
  }
  static ID = Metadata["id"];
}
