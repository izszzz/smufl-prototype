import { Type } from "./schema";
export * as Unit from "./unit";
export class MusicXml {
  constructor(public scorePartwise: Type.ScorePartwise) {}
}
