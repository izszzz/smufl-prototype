import { Score } from "../core/score"
import { SMUFLStave } from "./stave";
import { SMUFLTrack } from "./track"


export class SMUFLScore {
	type: "Pagenation" | "VerticalScroll" | "HorizontalScroll"
	page: unknown 
	stave: SMUFLStave
	constructor({tracks}: Score, clientWidth: number, type: SMUFLScore["type"]){
		this.type = type
		this.stave = new SMUFLStave(tracks.map(track=> new SMUFLTrack(track)), clientWidth, type)
	}
}