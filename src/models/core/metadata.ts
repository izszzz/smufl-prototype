interface IMetadata {
	timeSignature: {
		denominator: number;
		numerator: number;
	};
	bpm: number;
}
export class Metadata implements IMetadata {
	timeSignature;
	bpm;
	constructor({ timeSignature, bpm }: IMetadata) {
		this.timeSignature = timeSignature;
		this.bpm = bpm;
	}
}
