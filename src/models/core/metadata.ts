import metadata from "../../consts/metadata.json";

type TimeSignatureNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
interface IMetadata {
	timeSignature: {
		denominator: TimeSignatureNumber;
		numerator: TimeSignatureNumber;
	};
	bpm: number;
}
// TODO: getMeatadataの修正
// metadataが更新されるまで、prevのmetadataを保持する機能を追加
// metadataが存在しない -> prevのmetadataを遡る -> どこにもmetadataがない場合一つ上のクラスのmetadataを取得する

export class Metadata implements IMetadata {
	timeSignature;
	bpm;
	constructor(args?: Partial<IMetadata>) {
		this.timeSignature = args?.timeSignature ?? metadata.timeSignature;
		this.bpm = args?.bpm ?? metadata.bpm;
	}
}
