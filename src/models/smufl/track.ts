import { Track } from "../core/track";
import { SMUFLBar } from "./bar";

export class SMUFLTrack{
	bars: SMUFLBar[]
	constructor(track: Track){
		this.bars = track.bars.map(bar => new SMUFLBar(bar))
	}
}