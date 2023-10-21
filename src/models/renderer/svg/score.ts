import { SMUFLScore } from "../../smufl/score";
import { SMUFLGroup } from "./smufl";
import SVGTrack from "./track";

function SVGScore( score:SMUFLScore): SMUFLGroup{
	const children = score.tracks.map(track => SVGTrack(track))
	return ({
		type: "score", 
		element: "g",
		width: children.reduce((acc, item)=>acc + item.width, 0),
		y: 8,
		children: children.map((child, i) => ({...child, y: i * 12}))
	})
}

export default SVGScore