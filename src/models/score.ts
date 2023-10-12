import Track from "./track";

class Score {
	title: string;
	tracks: Track[] = [];
	constructor({title, tracks}: {title: string, tracks: Track[]}){
		this.title = title;
		this.tracks = tracks;
	}
}

export default Score;