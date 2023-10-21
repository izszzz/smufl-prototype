import { SMUFLTrack } from "./track";

export class SMUFLStave{
	staffs: number[] = []

	constructor(tracks: SMUFLTrack[]) {
		tracks.forEach(track=>{
			track.bars.forEach((bar, i)=>{
				if(bar.clef) this.staffs.push(bar.clef.staffWidth)
				if(bar.timeSig) this.staffs.push(bar.timeSig.numerator.staffWidth)
				bar.notes.forEach(note => {
					// if(note.accidental) this.staffs.push(note.accidental.staffWidth)
					// this.staffs.push(note.individualNote.staffWidth)
				})
			})
		})
	}
}