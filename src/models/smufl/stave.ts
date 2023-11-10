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

// TODO: immutable refactor
export class SMUFLStave{
	trackStaffRows: TrackStaff[][];
	clientWidth: number 
	type: "Pagenation" | "VerticalScroll" | "HorizontalScroll"

	constructor(tracks: SMUFLTrack[], clientWidth: number, type: "Pagenation" | "VerticalScroll" | "HorizontalScroll") {
		this.type = type
		this.clientWidth = clientWidth
		this.trackStaffRows = this.#layout(this.#generate(this.#ajustSpacing(tracks)))
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
			acc.push(...R.times(cur.spacing.left, ()=> new SMUFLStaff(1, lineCount))) // TODO: 定数
			if(R.isDefined(cur.accidental)) acc.push(new SMUFLStaff(cur.accidental.staffWidth, lineCount, cur.accidental))
			acc.push(new SMUFLStaff(cur.glyph.staffWidth, lineCount, cur.glyph))
			acc.push(...R.times(cur.spacing.right, ()=> new SMUFLStaff(1, lineCount))) // TODO: 定数
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
	#layout(trackStaffs: TrackStaff[]): TrackStaff[][]{
		if(this.type === "HorizontalScroll") return [trackStaffs.map(({barStaffs})=>this.#layoutBarStaffs(barStaffs))]
		if(this.type === "VerticalScroll") return this.#layoutNewLine(trackStaffs).map(trackStaffs=>trackStaffs.map(({barStaffs})=>this.#layoutBarStaffs(barStaffs)))
		return []
	}
	#layoutNewLine(trackStaffs: TrackStaff[]): TrackStaff[][]{
		return trackStaffs[0].barStaffs.reduce<{rows: TrackStaff[][], width: number, start: number}>((acc, cur, i)=>{
			acc.width += cur.staffs.reduce((acc,cur) => acc+ cur.width, 0)
			if(acc.width > this.clientWidth){
				acc.width = 0	
				acc.rows.push(trackStaffs.map(({barStaffs})=>({barStaffs: barStaffs.slice(acc.start, i)})))
				acc.start = i
			}
			if(i === trackStaffs[0].barStaffs.length-1 && acc.width < this.clientWidth)
				acc.rows.push(trackStaffs.map(({barStaffs})=>({barStaffs: barStaffs.slice(acc.start)})))
			return acc
		}, {rows: [], width: 0, start: 0}).rows
	}
	#layoutBarStaffs(barStaffs: BarStaff[]){
		return barStaffs.reduce<{barStaffs: BarStaff[], prev: BarStaff | null}>((acc, cur)=> {
			if(acc.prev) cur.x =  acc.prev.x + acc.prev.staffs.reduce((acc, cur)=>acc + cur.width, 0)
			this.#layoutStaffs(cur.staffs)
			acc.prev = cur
			acc.barStaffs.push(cur)
			return acc
		}, {barStaffs: [], prev: null})
	}
	#layoutStaffs(staffs: SMUFLStaff[]): SMUFLStaff[]{
		return staffs.reduce<{staffs: SMUFLStaff[], prev: SMUFLStaff | null}>((acc, cur)=> {
			if(acc.prev) cur.x =  acc.prev.x + acc.prev.width
			acc.prev = cur
			acc.staffs.push(cur)
			return acc
		}, {staffs: [], prev: null}).staffs
	}
}