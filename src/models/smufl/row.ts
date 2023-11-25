import * as  SMUFL from "./";
import * as  R from "remeda";

export class Row {
	 tracks: SMUFL.Track[]
	 prev?: Row
	 constructor(tracks: Row["tracks"], prev?: Row["prev"]){
		this.prev = prev
		this.tracks = tracks.map(track=>{
			const firstBar = R.first(track.bars)
			firstBar?.glyphs.push(firstBar.metadata.clef)
			if(R.isNil(this.prev))firstBar?.glyphs.push(firstBar.metadata.timeSig)
			return track
		})
	 }
}