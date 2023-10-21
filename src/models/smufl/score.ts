import { Score } from "../core/score"
import { SMUFLStave } from "./stave";
import { SMUFLTrack } from "./track"

export class SMUFLScore {
	tracks: SMUFLTrack[]
	stave: SMUFLStave
	width: number;
	constructor(score: Score, width: number){
		this.tracks = score.tracks.map(track=> new SMUFLTrack(track))
		this.width = width
		this.stave = new SMUFLStave(this.tracks)
	}
}