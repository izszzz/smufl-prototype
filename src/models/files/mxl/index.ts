import { Type } from "./schema";

export class MusicXml {
  constructor(public scorePartwise: Type.ScorePartwise) {
    console.log(scorePartwise);
  }
}
