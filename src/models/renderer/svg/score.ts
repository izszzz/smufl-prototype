import Score from "../../score";
import { SMUFLGroup } from "./interfaces";
import SVGTrack from "./track";

function SVGScore( score:Score): SMUFLGroup{
	return ({
		type: "score", 
		element: "g",
		width: 0,
		y: 8,
		children: score.tracks.map(track => SVGTrack(track))
	})
}

export default SVGScore