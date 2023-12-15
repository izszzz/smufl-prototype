interface IMetadata {
	timeSignature: {
		denominator: number;
		numerator: number;
	};
}
export class Metadata implements IMetadata {
	timeSignature;
	constructor({ timeSignature }: IMetadata) {
		this.timeSignature = timeSignature;
	}
}
