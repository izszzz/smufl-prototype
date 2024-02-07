import * as R from "remeda";
import metadata from "../../consts/metadata.json";

interface IMetadata {
	timeSignature?: {
		denominator: number;
		numerator: number;
	};
	bpm?: number;
}
export class Metadata implements IMetadata {
	private _timeSignature: IMetadata["timeSignature"];
	private _bpm: IMetadata["bpm"];
	get timeSignature() {
		return this._timeSignature ?? metadata.timeSignature;
	}
	set timeSignature(value) {
		this._timeSignature = value;
	}
	get bpm() {
		return this._bpm ?? metadata.bpm;
	}
	set bpm(value) {
		this._bpm = value;
	}
	constructor(metadata?: IMetadata) {
		if (metadata) {
			const { timeSignature, bpm } = metadata;
			if (R.isDefined(timeSignature)) this.timeSignature = timeSignature;
			if (R.isDefined(bpm)) this.bpm = bpm;
		}
	}
}
