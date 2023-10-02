// @ts-ignore
import { Midi, Track as MidiTrack, Score as MidiScore } from "@tonejs/midi";
import Track from "./track";

class Score {
	title: string;
	tracks: Track[] = [];
	constructor({title, midi}: {title: string, midi: MidiScore}){
		this.title = title;
		this.generateTracks(midi.tracks)
	}
	generateTracks(tracks: MidiTrack[]){
		this.tracks = tracks.map(track => new Track(track));
	}
	convertMidi = async () => await Midi.fromUrl(`${process.env.PUBLIC_URL}/tests/test.mid`);
}

export default Score;