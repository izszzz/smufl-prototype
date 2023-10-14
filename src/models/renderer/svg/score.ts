import Score from "../../score";
import { SMUFLGroup } from "./interfaces";
import SVGTrack from "./track";

function SVGScore( score:Score): SMUFLGroup{
	const children = score.tracks.map(track => SVGTrack(track))
	return ({
		type: "score", 
		element: "g",
		width: children.reduce((acc, item)=>acc + item.width, 0),
		y: 8,
		children: children.map((child, i, array) => ({...child, y: i * 12}))
	})
}

export default SVGScore