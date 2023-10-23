import Metadata from "../../consts/metadata.json";
import { Track } from "../core/track";
import { SMUFLBar } from "./bar";

export class SMUFLTrack{
	bars: SMUFLBar[]
	staffLineCount: Metadata["staffLines"][number] = 5;
	constructor(track: Track){
		this.bars = track.bars.map(bar => new SMUFLBar(bar))
	}
}