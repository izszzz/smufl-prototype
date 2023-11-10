import { Score } from "../core/score"
import { SMUFLStave } from "./stave";
import { SMUFLTrack } from "./track"


export class SMUFLScore {
	stave: SMUFLStave
	constructor({tracks}: Score, clientWidth: number, type: SMUFLStave["type"]){
		this.stave = new SMUFLStave(tracks.map(track=> new SMUFLTrack(track)), clientWidth, type)
	}
}