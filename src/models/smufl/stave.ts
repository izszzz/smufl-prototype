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
		const barStaffs = bar.glyphs.map(glyph => new SMUFLStaff(glyph.width, 5, glyph))
		const noteStaffs =  bar.notes.reduce<SMUFLStaff[]>((acc, cur) => {
			[...Array(cur.spacing.left)].forEach(()=>acc.push(new SMUFLStaff(1, lineCount)))
			if(R.isDefined(cur.accidental)) acc.push(new SMUFLStaff(cur.accidental.width,lineCount, cur.accidental))
			acc.push(new SMUFLStaff(cur.glyph.width, lineCount, cur.glyph))
			return acc
		}, [])
		const staffs = [new SMUFLStaff(bar.barline.start.width, lineCount, bar.barline.start), ...barStaffs, ...noteStaffs]
		if(bar.barline.end)staffs.push(new SMUFLStaff(bar.barline.end.width, lineCount, bar.barline.end))

		return {
			staffs, 
			x:0,
		}
	}

	#ajustSpacing(tracks: SMUFLTrack[]): SMUFLTrack[]{
		const verticalBars = tracks[0].bars.flatMap((_,barIndex)=> tracks.map((track)=>track.bars[barIndex]))
		const verticalNotes = verticalBars[0].notes.flatMap((_,noteIndex)=>verticalBars.map((verticalBar)=> verticalBar.notes[noteIndex]))
		const maxWidthVerticalNote = R.pipe(verticalNotes,R.sortBy(note=>note.width), R.last())
		if(maxWidthVerticalNote) verticalNotes.forEach(note => {
			if(note.width !== maxWidthVerticalNote.width) note.spacing.left += maxWidthVerticalNote.width - note.width
		})
		if(verticalNotes.some(note=>R.isDefined(note.accidental))) verticalNotes.forEach(note=> { if(R.isNil(note.accidental)) note.spacing.left += 1 })
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
			 },{barStaffs: [], prev: null})
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