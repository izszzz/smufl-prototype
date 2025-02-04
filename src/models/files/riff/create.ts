import Riff, { Chunk } from ".";
import { Parser } from "./parser";

export function create(arrayBuffer: ArrayBuffer) {
  return new Riff(
    (Parser.parse(new Uint8Array(arrayBuffer)) as { chunks: Chunk[] }).chunks
  );
}
