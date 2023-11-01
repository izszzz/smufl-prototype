import * as R from 'remeda';
import { SMUFLStaff } from "./staff";
import { SMUFLTrack } from "./track";
import { SMUFLBar } from './bar';

interface BarStaff{
	x: number;
	staffs: SMUFLStaff[]
}
interface TrackStaff{
	barStaffs: BarStaff[]
}
export class SMUFLStave{
	trackStaffs: TrackStaff[]; 

	constructor(tracks: SMUFLTrack[]) {
		this.trackStaffs = this.#layout(this.#generate(this.#ajustSpacing(tracks)))
	}
	#generate(tracks: SMUFLTrack[]): TrackStaff[]{
		return tracks.map((track)=> this.#generateTrackStaff(track))
	}
	#generateTrackStaff(track: SMUFLTrack): TrackStaff {
		return { barStaffs: track.bars.map((bar)=> this.#generateBarStaff(bar, track.staffLineCount)) }
	}
	#generateBarStaff(bar: SMUFLBar, lineCount: SMUFLTrack["staffLineCount"]): BarStaff{
		const barStaffs = bar.glyphs.map(glyph => new SMUFLStaff(glyph.staffWidth, lineCount, glyph))
		const noteStaffs =  bar.notes.reduce<SMUFLStaff[]>((acc, cur) => {
			acc.push(...R.times(cur.spacing.left, ()=>new SMUFLStaff(1, lineCount))) // TODO: 定数
			if(R.isDefined(cur.accidental)) acc.push(new SMUFLStaff(cur.accidental.staffWidth, lineCount, cur.accidental))
			acc.push(new SMUFLStaff(cur.glyph.staffWidth, lineCount, cur.glyph))
			acc.push(...R.times(cur.spacing.right, ()=>new SMUFLStaff(1, lineCount))) // TODO: 定数
			return acc
		}, [])
		const staffs = [new SMUFLStaff(bar.barline.start.staffWidth, lineCount, bar.barline.start), ...barStaffs, ...noteStaffs]
		if(bar.barline.end)staffs.push(new SMUFLStaff(bar.barline.end.staffWidth, lineCount, bar.barline.end))

		return {
			staffs, 
			x:0,
		}
	}

	#ajustSpacing(tracks: SMUFLTrack[]): SMUFLTrack[]{
		const verticalNotesCollection = tracks[0].bars.map((_, barIndex)=>tracks.map(track=>track.bars[barIndex])).map((verticalBars)=>
			verticalBars[0].notes.map((_, noteIndex)=>
				verticalBars.map(verticalBar=>
					verticalBar.notes[noteIndex]
				)
			)
		)
		verticalNotesCollection.forEach(verticalBars=>{
			verticalBars.forEach((verticalNotes)=>{
				const maxWidthVerticalNote = R.pipe(verticalNotes, R.sortBy(note=>note.glyph.staffWidth), R.last())
				if(maxWidthVerticalNote) verticalNotes.forEach(note => {
					if(note.glyph.staffWidth!== maxWidthVerticalNote.glyph.staffWidth) note.spacing.right = maxWidthVerticalNote.glyph.staffWidth - note.glyph.staffWidth
				})
				if(verticalNotes.some(note=>R.isDefined(note.accidental))) verticalNotes.forEach(note=> { if(R.isNil(note.accidental)) note.spacing.left = 1 })
			})
		})
		
		return tracks
	}
	#layout(trackStaffs: TrackStaff[]): TrackStaff[]{
		return trackStaffs.map(trackStaff => 
			  trackStaff.barStaffs.reduce<{barStaffs: BarStaff[], prev: BarStaff | null}>((acc, cur)=> {
				if(acc.prev) cur.x =  acc.prev.x + acc.prev.staffs.reduce((acc, cur)=>acc + cur.width, 0)
				this.#layoutStaffs(cur.staffs)
				acc.prev = cur
				acc.barStaffs.push(cur)
				return acc
			 }, {barStaffs: [], prev: null})
		)
	}
	#layoutBarStaff(barStaffs: BarStaff){

	}
	#layoutStaffs(staffs: SMUFLStaff[]): SMUFLStaff[]{
		return staffs.reduce<{staffs: SMUFLStaff[], prev: SMUFLStaff | null}>((acc, cur)=> {
			if(acc.prev) cur.x =  acc.prev.x + acc.prev.width
			acc.prev = cur
			acc.staffs.push(cur)
			return acc
		},{staffs: [], prev: null}).staffs
	}
}