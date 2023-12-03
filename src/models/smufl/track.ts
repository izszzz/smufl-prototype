import Metadata from "../../consts/metadata.json";
import * as Core  from "../core";
import * as  SMUFL from "./";

export class Track{
	bars: SMUFL.Bar[]
	metadata = {
		clef: new SMUFL.Glyph("gClef", {coord: {y: -1}}),
		timeSig: new SMUFL.Ligature([new SMUFL.Glyph("timeSig4", { coord: {y: -1} }), new SMUFL.Glyph("timeSig4", {coord: {y: -3}})])
	}
	staffLineCount: Metadata["staffLines"][number] = 5;
	constructor(track: Core.Track){
		this.bars = track.bars.map(bar => new SMUFL.Bar(bar))
	}
}