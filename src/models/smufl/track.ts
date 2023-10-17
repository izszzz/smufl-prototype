import { Track } from "../core/track";
import { SMUFLBar } from "./bar";

export class SMUFLTrack{
	private track: Track
	smuflBars: SMUFLBar[]
	constructor(track: Track){
		this.track = track
		this.smuflBars = track.bars.map(bar => new SMUFLBar(bar))
	}
}