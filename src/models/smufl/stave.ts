import { SMUFLStaff } from "./staff";
import { SMUFLTrack } from "./track";
interface BarStaff{
	width:number;
	x: number;
	glyphs: SMUFLStaff[]
	prev: BarStaff | null
}
interface TrackStaff{
	barStaffs: BarStaff[]
}
export class SMUFLStave{
	trackStaffs: TrackStaff[]; 

	constructor(tracks: SMUFLTrack[]) {
		this.trackStaffs = this.generateStaffs(tracks)
	}
	private generateStaffs(tracks: SMUFLTrack[]){
		const trackStaffs: TrackStaff[] = []
		tracks.forEach((track)=>{
			const {barStaffs}= track.bars.reduce<{barStaffs: BarStaff[], prev: BarStaff | null}>((acc, cur)=>
				{
					const staffGlyphs = [cur.barline.start, ...cur.glyphs, ...cur.notes.flatMap(note=>note.glyphs)]
					if(cur.barline.end) staffGlyphs.push(cur.barline.end)
					const {glyphs, width} = staffGlyphs.reduce<{glyphs: SMUFLStaff[], prev: SMUFLStaff | null, width: number}>(
							(acc, cur) => {
								const staffGlyph = new SMUFLStaff(Array.isArray(cur) ? cur : [cur], acc.prev, track.staffLineCount)
								acc.width += staffGlyph.width
								acc.glyphs.push(staffGlyph)
								acc.prev = staffGlyph
								return acc
							},
							{glyphs:[], prev: null, width: 0}
						)
					const barStaff = {glyphs, width, prev: acc.prev, x: acc.prev ? acc.prev.x + acc.prev.width : 0}
					acc.barStaffs.push(barStaff)
					acc.prev = barStaff
					return acc
				},
				{barStaffs: [], prev: null}
			)
			trackStaffs.push({barStaffs})
		})
		return trackStaffs
	}
}