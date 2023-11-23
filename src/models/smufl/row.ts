import * as  SMUFL from "./";

export class Row {
	 tracks: SMUFL.Track[]
	 staffs: SMUFL.Staff[]
	 constructor(tracks: Row["tracks"]){
		this.tracks = tracks
		this.staffs = []
	 }
}