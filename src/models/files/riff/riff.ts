import Metadata from "./metadata.json";

export interface RiffChunk<Id, Data> {
  id: Id;
  length: number;
  data: Data;
}
export { Metadata };
