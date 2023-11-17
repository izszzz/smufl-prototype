import Metadata from "../../consts/metadata.json";
import { Track } from "../core/track";
import { SMUFLBar } from "./bar";
import { SMUFLGlyph } from "./glyph";
import { SMUFLLigature } from "./ligature";

export class SMUFLTrack{
	bars: SMUFLBar[]
	metadata = {
		clef: new SMUFLGlyph("gClef", {y: -1}),
		timeSig: new SMUFLLigature([new SMUFLGlyph("timeSig4", {y: -1}), new SMUFLGlyph("timeSig4", {y: -3})])
	}
	staffLineCount: Metadata["staffLines"][number] = 5;
	constructor(track: Track){
		this.bars = track.bars.map(bar => new SMUFLBar(bar))
	}
}