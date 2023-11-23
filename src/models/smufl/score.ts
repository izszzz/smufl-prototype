import *  as SMUFL from "./"
import { Score as CoreScore } from "../core/score"


export class Score {
	stave: SMUFL.Stave
	rows: SMUFL.Row[];
	constructor({tracks}: CoreScore, clientWidth: number, type: SMUFL.Stave["type"]){
		this.stave = new SMUFL.Stave(tracks.map(track=> new SMUFL.Track(track)), clientWidth, type)
		this.rows = []
	}
}