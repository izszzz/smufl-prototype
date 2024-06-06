import metadata from "../../consts/metadata.json";

// type TimeSignatureNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
interface IMetadata {
  timeSignature: {
    denominator: number;
    numerator: number;
  };
  bpm: number;
}
// TODO: getMeatadataの修正
// metadataが更新されるまで、prevのmetadataを保持する機能を追加
// metadataが存在しない -> prevのmetadataを遡る -> どこにもmetadataがない場合一つ上のクラスのmetadataを取得する

export class Metadata implements IMetadata {
  timeSignature;
  bpm;
  constructor(
    args: Partial<IMetadata> = {
      timeSignature: metadata.timeSignature,
      bpm: metadata.bpm,
    }
  ) {
    this.timeSignature = args?.timeSignature ?? metadata.timeSignature;
    this.bpm = args?.bpm ?? metadata.bpm;
  }
}
