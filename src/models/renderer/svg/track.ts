import { SMUFLTrack } from "../../smufl/track";
import SVGBar from "./bar";
import { SMUFLGroup } from "./smufl";

export default function SVGTrack(track: SMUFLTrack): SMUFLGroup {
	let x = 0
	const children = track.bars
		.map((bar)=>SVGBar(bar))
		.map((child, i, array) => {
			if(array[i-1]) x += array[i -1].width
			return array[i-1] ? {...child, x}: child
		})

	return ({
		type: "track",
		element: "g",
		width: children.reduce((acc, item)=>acc + item.width, 0),
		children
	})
}