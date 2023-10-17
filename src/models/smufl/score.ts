import { Score } from "../core/score"
import { SMUFLTrack } from "./track"

export class SMUFLScore{
	private score: Score
	smuflTracks: SMUFLTrack[]
	columns: SMUFLTrack[] = []
	constructor(score: Score){
		this.score = score
		this.smuflTracks = score.tracks.map(track=> new SMUFLTrack(track))
	}
}