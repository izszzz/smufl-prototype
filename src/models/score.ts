import Track from "./track";


interface ScoreConstructorArgs{
	tracks: Track[];
	name?: string;
	bpm?: number;
	timeSignature?: [number, number]
}

class Score implements ScoreConstructorArgs {
	name
	bpm
	tracks
	timeSignature
	constructor({name, tracks, bpm, timeSignature}: ScoreConstructorArgs){
		this.bpm = bpm
		this.name = name;
		this.tracks = tracks;
		this.timeSignature = timeSignature
	}
}

export default Score;