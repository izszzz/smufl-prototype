import Metadata from "../../consts/metadata.json";
import { Track as CoreTrack } from "../core/track";
import * as  SMUFL from "./";

export class Track{
	bars: SMUFL.Bar[]
	metadata = {
		clef: new SMUFL.Glyph("gClef", {y: -1}),
		timeSig: new SMUFL.Ligature([new SMUFL.Glyph("timeSig4", {y: -1}), new SMUFL.Glyph("timeSig4", {y: -3})])
	}
	staffLineCount: Metadata["staffLines"][number] = 5;
	constructor(track: CoreTrack){
		this.bars = track.bars.map(bar => new SMUFL.Bar(bar))
	}
}