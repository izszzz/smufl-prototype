import { SMUFLStaff } from "./staff";
import { SMUFLTrack } from "./track";

export class SMUFLStave{
	staves: SMUFLStaff[][][] = []

	constructor(tracks: SMUFLTrack[]) {
		tracks.forEach((track, trackIndex)=>{
			this.staves[trackIndex] = []
			track.bars.forEach((bar, barIndex)=>{
				this.staves[trackIndex][barIndex] = []
					this.staves[trackIndex][barIndex].push(
						...[...bar.glyphs, ...bar.notes.flatMap(note=>note.glyphs)].reduce<{staffs: SMUFLStaff[], prev: SMUFLStaff | null}>(
							(acc, cur) => {
								const staff = new SMUFLStaff(Array.isArray(cur) ? cur : [cur], acc.prev)
								acc.staffs.push(staff)
								acc.prev = staff
								return acc
							},
							{staffs:[], prev: null}
						).staffs
					)
			})
		})
	}
}