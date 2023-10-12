import Track from "../../track";
import {  SMUFLGroup, } from './interfaces';
import SVGBar from "./bar";

export default function SVGTrack(track: Track): SMUFLGroup {
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
		width: 0,
		children
	})
}